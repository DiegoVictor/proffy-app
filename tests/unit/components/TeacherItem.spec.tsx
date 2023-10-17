import { act, fireEvent, render } from '@testing-library/react-native';
import { Linking, Alert } from 'react-native';

import { factory } from '../../utils/factory';
import { Teacher, TeacherItem } from '../../../src/components/TeacherItem';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const formatValue = (value: number) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const apiMock = new MockAdapter(api);

describe('TeacherItem', () => {
  it('should be able to see teacher details', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    const { getByTestId, getByText } = render(
      <TeacherItem teacher={teacher} favorited={true} />,
    );

    expect(getByText(teacher.name)).toBeTruthy();
    expect(getByText(teacher.subject)).toBeTruthy();
    expect(getByTestId(`teacher-${teacher.id}-avatar`)).toBeTruthy();
    expect(getByText(teacher.bio)).toBeTruthy();
    expect(getByText(`Preço/hora ${formatValue(teacher.cost)}`)).toBeTruthy();
  });

  it('should be able to redirected to whatsapp', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    const openURL = jest.spyOn(Linking, 'openURL');

    apiMock.onPost('connections').reply(200);

    const { getByTestId } = render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('contact'));
    });

    expect(openURL).toHaveBeenCalledWith(
      `http://api.whatsapp.com/send?phone=${teacher.whatsapp}`,
    );

    const [request] = apiMock.history.post;
    expect(request).toMatchObject({
      url: 'connections',
      data: JSON.stringify({ user_id: teacher.id }),
    });
  });

  it('should not be able to redirected to whatsapp', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    const openURL = jest.spyOn(Linking, 'openURL');
    const alert = jest.spyOn(Alert, 'alert');

    apiMock.onPost('connections').reply(200);
    openURL.mockRejectedValueOnce(new Error());

    const { getByTestId } = render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('contact'));
    });

    expect(openURL).toHaveBeenCalledWith(
      `http://api.whatsapp.com/send?phone=${teacher.whatsapp}`,
    );

    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!',
    );
  });

  it('should be able to favorite a teacher', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');

    const { getByTestId } = render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('favorite'));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([teacher]),
    );
  });

  it('should be able to unfavorite a teacher', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    await AsyncStorage.setItem('favorites', JSON.stringify([teacher]));

    const { getByTestId } = render(
      <TeacherItem teacher={teacher} favorited={true} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('favorite'));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([]),
    );
  });
});
