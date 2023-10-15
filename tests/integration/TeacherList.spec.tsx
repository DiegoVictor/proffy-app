import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockAdapter from 'axios-mock-adapter';
import { Alert } from 'react-native';

import { TeacherList } from '../../src/pages/TeacherList';
import api from '../../src/services/api';
import { factory } from '../utils/factory';
import { Teacher } from '../../src/components/TeacherItem';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Feather: () => <View />,
  };
});

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

const apiMock = new MockAdapter(api);

describe('TeacherList Page', () => {
  it('should be able to get a list of teachers', async () => {
    const [teacher, favorite] = await factory.attrsMany<Teacher>('Teacher', 2);
    await AsyncStorage.setItem('favorites', JSON.stringify([favorite]));

    apiMock.onGet('classes').reply(200, [teacher]);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <TeacherList />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('show-filters'));
    });

    fireEvent.changeText(
      getByPlaceholderText('Qual a máteria?'),
      teacher.subject,
    );
    fireEvent.changeText(getByPlaceholderText('Qual o dia?'), 'Segunda');
    fireEvent.changeText(getByPlaceholderText('Qual o horário?'), '10:00');

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    await waitFor(() => getByText(teacher.name));

    expect(getByText(teacher.subject)).toBeTruthy();
    expect(getByText(teacher.bio)).toBeTruthy();
    expect(getByText(`Preço/hora ${formatValue(teacher.cost)}`)).toBeTruthy();
    expect(getByTestId(`teacher-${teacher.id}-avatar`)).toBeTruthy();
  });

  it('should not be able to get a list of teachers with invalid filters', async () => {
    const { getByTestId, getAllByText } = render(<TeacherList />);

    await act(async () => {
      fireEvent.press(getByTestId('show-filters'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(getAllByText('Este campo é obrigatório').length).toBe(3);
  });

  it('should be able to get a list of teachers', async () => {
    await AsyncStorage.setItem('favorites', JSON.stringify([]));

    apiMock.onGet('classes').reply(400);
    const alert = jest.spyOn(Alert, 'alert');

    const { getByTestId, getByPlaceholderText } = render(<TeacherList />);

    await act(async () => {
      fireEvent.press(getByTestId('show-filters'));
    });

    fireEvent.changeText(getByPlaceholderText('Qual a máteria?'), 'English');
    fireEvent.changeText(getByPlaceholderText('Qual o dia?'), 'Segunda');
    fireEvent.changeText(getByPlaceholderText('Qual o horário?'), '10:00');

    await act(async () => {
      fireEvent.press(getByTestId('submit'));
    });

    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente mais tarde!',
    );
  });
});
