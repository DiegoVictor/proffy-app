import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { Landing } from '../../src/pages/Landing';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
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

describe('Landing Page', () => {
  it('should be able to show connections counter', async () => {
    const total = faker.number.int();
    mockApiGet.mockResolvedValueOnce({ data: { total } });

    const { getByTestId } = await render(<Landing />);

    await waitFor(() => getByTestId('connections'));

    expect(getByTestId('connections')).toHaveTextContent(
      `Total de ${total} conexões já realizadas`,
    );
  });

  it('should be able to novigate to Study page', async () => {
    const total = faker.number.int();
    mockApiGet.mockResolvedValueOnce({ data: { total } });

    const { getByTestId } = await render(<Landing />);

    await fireEvent.press(getByTestId('study'));

    expect(mockNavigate).toHaveBeenCalledWith('Study');
  });

  it('should be able to novigate to GiveClasses page', async () => {
    const total = faker.number.int();
    mockApiGet.mockResolvedValueOnce({ data: { total } });

    const { getByTestId } = await render(<Landing />);

    await fireEvent.press(getByTestId('give-classes'));

    expect(mockNavigate).toHaveBeenCalledWith('GiveClasses');
  });
});
