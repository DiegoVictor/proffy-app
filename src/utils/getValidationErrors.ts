import { ValidationError } from 'yup';

interface ErrorBag {
  [key: string]: string;
}

export const getValidationErrors = (err: ValidationError): ErrorBag => {
  const validationErrors = err.inner.reduce<ErrorBag>((errorBag, error) => {
    if (error.path) {
      errorBag[error.path] = error.message;
    }
    return errorBag;
  }, {});

  return validationErrors;
};
