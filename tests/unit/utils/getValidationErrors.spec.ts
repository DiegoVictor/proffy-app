import { ValidationError } from 'yup';

import { getValidationErrors } from '../../../src/utils/getValidationErrors';

describe('getValidationErrors', () => {
  it('should be able to return validation errors', () => {
    const err = new ValidationError([
      new ValidationError('Please enter a name, it is required', false, 'name'),
    ]);
    expect(getValidationErrors(err)).toStrictEqual({
      name: 'Please enter a name, it is required',
    });
  });

  it('should not be able to return validation errors with the field name is not provided', () => {
    const err = new ValidationError([
      new ValidationError('Please enter a name, it is required'),
    ]);
    expect(getValidationErrors(err)).toStrictEqual({});
  });
});
