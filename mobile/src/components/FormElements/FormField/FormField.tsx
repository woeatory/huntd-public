import React, { FC } from 'react';
import { View, Text } from 'react-native';
import {
  FieldError, Controller, Control, RegisterOptions,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { formStyles } from '@/ui/form/form.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { SelectOption } from '@/controllers/form/form.constants';
import { CandidateProfileCityInput } from '@/controllers/graphql/generated';

export interface RenderInputProps {
  onChange: (value: any) => void;
  onBlur: (value: string) => void;
  value: string;
  placeholder?: string;
  invalid: boolean;
}

interface Props {
  control: Control;
  name: string;
  renderInput: (props: RenderInputProps) => JSX.Element;
  defaultValue?: string | number | SelectOption | null
    | Array<string | number> | CandidateProfileCityInput;
  label?: string;
  error?: FieldError;
  rules?: RegisterOptions;
  placeholder?: string;
}

export const FormField: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Validations]);
  const {
    label,
    name,
    defaultValue = '',
    renderInput,
    control,
    error,
    rules,
    placeholder = label,
  } = props;

  const errorMessage = error?.message || error?.type;

  return (
    <View style={formStyles.container}>
      {label && (
        <View>
          <Text style={formStyles.label}>{label}</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => renderInput({
          onChange,
          onBlur,
          value,
          placeholder,
          invalid: !!error,
        })}
        name={name}
        defaultValue={String(defaultValue)}
        rules={rules}
      />
      {errorMessage && (
        <View>
          <Text style={formStyles.error}>
            {t(`${Namespaces.Validations}:${errorMessage}`)}
          </Text>
        </View>
      )}
    </View>
  );
};
