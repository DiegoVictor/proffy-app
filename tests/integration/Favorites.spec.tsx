import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Favorites } from '../../src/pages/Favorites';
import { factory } from '../utils/factory';
import { Teacher } from '../../src/components/TeacherItem';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

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

const formatValue = (value: number) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

describe('Favorites Page', () => {
  it('should be able to list favorited teachers', async () => {
    const teachers = await factory.attrsMany<Teacher>('Teacher', 3);
    await AsyncStorage.setItem('favorites', JSON.stringify(teachers));

    const { getByText, getByTestId } = render(<Favorites />);

    const [{ name }] = teachers;
    await waitFor(() => getByText(name));

    teachers.forEach(({ id, name, subject, bio, cost }) => {
      expect(getByText(name)).toBeTruthy();
      expect(getByText(subject)).toBeTruthy();
      expect(getByText(bio)).toBeTruthy();
      expect(getByText(`Preço/hora ${formatValue(cost)}`)).toBeTruthy();
      expect(getByTestId(`teacher-${id}-avatar`)).toBeTruthy();
    });
  });
});
