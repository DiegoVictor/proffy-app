import { fireEvent, render } from '@testing-library/react-native';

import { PageHeader } from '../../src/components/PageHeader';
import { faker } from '@faker-js/faker';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('PageHeader', () => {
  it('should be able to go back to Landing page', async () => {
    const title = faker.lorem.word();
    const { getByTestId, getByText } = render(<PageHeader title={title} />);

    fireEvent.press(getByTestId('back'));

    expect(mockNavigate).toHaveBeenCalledWith('Landing');
    expect(getByText(title)).toBeTruthy();
  });
});
