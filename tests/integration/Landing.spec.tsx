import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';

import { Landing } from '../../src/pages/Landing';
import api from '../../src/services/api';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const apiMock = new MockAdapter(api);

describe('Landing Page', () => {
  it('should be able to show connections counter', async () => {
    const total = faker.number.int();
    apiMock.onGet('connections').reply(200, { total });

    const { getByTestId } = render(<Landing />);

    await waitFor(() => getByTestId('connections'));

    expect(getByTestId('connections')).toHaveTextContent(
      `Total de ${total} conexões já realizadas`,
    );
  });

  it('should be able to novigate to Study page', async () => {
    const total = faker.number.int();
    apiMock.onGet('connections').reply(200, { total });

    const { getByTestId } = render(<Landing />);

    await act(async () => {
      fireEvent.press(getByTestId('study'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('Study');
  });

  it('should be able to novigate to GiveClasses page', async () => {
    const total = faker.number.int();
    apiMock.onGet('connections').reply(200, { total });

    const { getByTestId } = render(<Landing />);

    await act(async () => {
      fireEvent.press(getByTestId('give-classes'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('GiveClasses');
  });
});
