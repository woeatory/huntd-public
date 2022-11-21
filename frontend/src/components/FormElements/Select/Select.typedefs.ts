import { ValueType } from 'react-select';

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomSelectProps<InitialValue> {
  id: string;
  onBlur?: () => void;
  onChange?: (value?: ValueType<SelectOption>) => void;
  value?: ValueType<SelectOption> | null;
  disabled?: boolean;
  initialValue: InitialValue | null;
}
