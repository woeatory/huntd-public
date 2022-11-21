import { UseFormMethods } from 'react-hook-form';

export interface FormFieldProps<IV, FD> extends UseFormMethods<FD> {
  formDisabled: boolean;
  initialValue?: IV
}
