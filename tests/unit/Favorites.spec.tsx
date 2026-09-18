import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Favorites } from '../../src/pages/Study/Favorites';
import { factory } from '../utils/factory';
import { Teacher } from '../../src/components/TeacherItem';

let mockFlag = true;
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useFocusEffect: (cb: () => void) => {
      if (mockFlag) {
        cb();
        mockFlag = false;
      }
    },
  };
});

const mockApiGet = jest.fn();
jest.mock('../../src/services/api', () => {
  return {
    api: {
      get: (url: string, data: Record<string, unknown>) =>
        mockApiGet(url, data),
    },
  };
});

const formatValue = (value: number) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

describe('Favorites Page', () => {
  beforeEach(() => {
    mockFlag = true;
  });

  it('should be able to list favorited teachers', async () => {
    const teachers = await factory.attrsMany<Teacher>('Teacher', 3);
    await AsyncStorage.setItem('favorites', JSON.stringify(teachers));

    const { getByText, getByTestId } = await render(<Favorites />);

    const [{ name }] = teachers;
    await waitFor(() => getByText(name));

    teachers.forEach(({ id, name, subject, bio, cost }: Teacher) => {
      expect(getByText(name)).toBeTruthy();
      expect(getByText(subject)).toBeTruthy();
      expect(getByText(bio)).toBeTruthy();
      expect(getByText(`Preço/hora ${formatValue(cost)}`)).toBeTruthy();
      expect(getByTestId(`teacher-${id}-avatar`)).toBeTruthy();
    });
  });

  it('should be able to load an empty list', async () => {
    await AsyncStorage.removeItem('favorites');

    const { queryByText } = await render(<Favorites />);

    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1));

    expect(queryByText('Entrar em contato')).toBeFalsy();
  });
});
