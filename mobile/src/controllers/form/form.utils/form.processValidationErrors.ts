import { UseFormMethods } from 'react-hook-form';
import i18next from 'i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

export const processValidationErrors = <T>(error: Error, setError: UseFormMethods<T>['setError']) => {
  try {
    const params: {
      validation?: Record<keyof T, string>
    } = JSON.parse(error.message);

    if (!params.validation) {
      return null;
    }

    Object.entries(params.validation).forEach(([field, message]) => {
      setError(field as any, {
        message: i18next.t(`${Namespaces.Validations}:${(message as string).toLowerCase()}`),
        type: 'validation',
      });
    });

    return params.validation;
  } catch {
    return null;
  }
};
