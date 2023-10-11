import { ValidationError } from 'yup';

interface ErrorBag {
  [key: string]: string;
}

export const getValidationErrors = (err: ValidationError): ErrorBag => {
  const validationErrors: ErrorBag = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
};
