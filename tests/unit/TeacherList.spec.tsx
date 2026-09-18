import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { TeacherList } from '../../src/pages/Study/TeacherList';
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

describe('TeacherList Page', () => {
  beforeEach(() => {
    mockFlag = true;
  });

  it('should be able to get a list of favorited teachers', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    await AsyncStorage.setItem('favorites', JSON.stringify([teacher]));

    mockApiGet.mockResolvedValueOnce({ data: [teacher] });

    const { getByText, getByTestId, getByPlaceholderText } = await render(
      <TeacherList />,
    );

    await fireEvent.press(getByTestId('show-filters'));

    await fireEvent.changeText(
      getByPlaceholderText('Qual a máteria?'),
      teacher.subject,
    );
    await fireEvent.changeText(getByPlaceholderText('Qual o dia?'), 'Segunda');
    await fireEvent.changeText(
      getByPlaceholderText('Qual o horário?'),
      '10:00',
    );

    await fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText(teacher.name));

    expect(getByText(teacher.subject)).toBeTruthy();
    expect(getByText(teacher.bio)).toBeTruthy();
    expect(getByText(`Preço/hora ${formatValue(teacher.cost)}`)).toBeTruthy();
    expect(getByTestId(`teacher-${teacher.id}-avatar`)).toBeTruthy();
  });

  it('should be able to get a list of teachers', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    await AsyncStorage.removeItem('favorites');

    mockApiGet.mockResolvedValueOnce({ data: [teacher] });

    const { getByText, getByTestId, getByPlaceholderText } = await render(
      <TeacherList />,
    );

    await fireEvent.press(getByTestId('show-filters'));

    await fireEvent.changeText(
      getByPlaceholderText('Qual a máteria?'),
      teacher.subject,
    );
    await fireEvent.changeText(getByPlaceholderText('Qual o dia?'), 'Segunda');
    await fireEvent.changeText(
      getByPlaceholderText('Qual o horário?'),
      '10:00',
    );

    await fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText(teacher.name));

    expect(getByText(teacher.subject)).toBeTruthy();
    expect(getByText(teacher.bio)).toBeTruthy();
    expect(getByText(`Preço/hora ${formatValue(teacher.cost)}`)).toBeTruthy();
    expect(getByTestId(`teacher-${teacher.id}-avatar`)).toBeTruthy();
  });

  it('should not be able to get a list of teachers with invalid filters', async () => {
    const { getByTestId, getAllByText } = await render(<TeacherList />);

    await fireEvent.press(getByTestId('show-filters'));
    await fireEvent.press(getByTestId('submit'));

    expect(getAllByText('Este campo é obrigatório').length).toBe(3);
  });

  it('should be able to get a list of teachers', async () => {
    await AsyncStorage.setItem('favorites', JSON.stringify([]));

    mockApiGet.mockRejectedValueOnce(
      new Error('Request failed with status code 400'),
    );
    const alert = jest.spyOn(Alert, 'alert');

    const { getByTestId, getByPlaceholderText } = await render(<TeacherList />);

    await fireEvent.press(getByTestId('show-filters'));

    await fireEvent.changeText(
      getByPlaceholderText('Qual a máteria?'),
      'English',
    );
    await fireEvent.changeText(getByPlaceholderText('Qual o dia?'), 'Segunda');
    await fireEvent.changeText(
      getByPlaceholderText('Qual o horário?'),
      '10:00',
    );

    await fireEvent.press(getByTestId('submit'));

    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente mais tarde!',
    );
  });
});
