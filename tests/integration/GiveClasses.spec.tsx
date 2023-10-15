import { fireEvent, render } from '@testing-library/react-native';

import { GiveClasses } from '../../src/pages/GiveClasses';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('GiveClasses Page', () => {
  it('should be able to go back to Landing page', async () => {
    const { getByTestId } = render(<GiveClasses />);

    fireEvent.press(getByTestId('back'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
