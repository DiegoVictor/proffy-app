import { Linking, Alert } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { factory } from '../utils/factory';
import { Teacher, TeacherItem } from '../../src/components/TeacherItem';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockApiPost = jest.fn();
jest.mock('../../src/services/api', () => {
  return {
    api: {
      post: (url: string, data: Record<string, unknown>) =>
        mockApiPost(url, data),
    },
  };
});

const formatValue = (value: number) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

describe('TeacherItem', () => {
  it('should be able to see teacher details', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');

    const { getByTestId, getByText } = await render(
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

    mockApiPost.mockResolvedValueOnce({});

    const { getByTestId } = await render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await fireEvent.press(getByTestId('contact'));

    expect(openURL).toHaveBeenCalledWith(
      `http://api.whatsapp.com/send?phone=${teacher.whatsapp}`,
    );

    expect(mockApiPost).toHaveBeenCalledWith('connections', {
      user_id: teacher.id,
    });
  });

  it('should not be able to redirected to whatsapp', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');
    const openURL = jest.spyOn(Linking, 'openURL');
    const alert = jest.spyOn(Alert, 'alert');

    mockApiPost.mockResolvedValueOnce({});
    openURL.mockRejectedValueOnce(new Error());

    const { getByTestId } = await render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await fireEvent.press(getByTestId('contact'));

    expect(openURL).toHaveBeenCalledWith(
      `http://api.whatsapp.com/send?phone=${teacher.whatsapp}`,
    );

    expect(alert).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errado, tente novamente!',
    );
  });

  it('should be able to favorite a teacher', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');

    const { getByTestId } = await render(
      <TeacherItem teacher={teacher} favorited={false} />,
    );

    await fireEvent.press(getByTestId('favorite'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([teacher]),
    );
  });

  it('should be able to unfavorite a teacher', async () => {
    const teacher = await factory.attrs<Teacher>('Teacher');

    await AsyncStorage.setItem('favorites', JSON.stringify([teacher]));

    const { getByTestId } = await render(
      <TeacherItem teacher={teacher} favorited={true} />,
    );

    await fireEvent.press(getByTestId('favorite'));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([]),
    );
  });
});
