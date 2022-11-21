import { UseFormMethods } from 'react-hook-form';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { i18n } from '@/controllers/i18n/i18n.client';

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
        message: i18n.t(`${Namespaces.Validations}:${(message as string).toLowerCase()}`),
        type: 'validation',
      });
    });

    return params.validation;
  } catch {
    return null;
  }
};
