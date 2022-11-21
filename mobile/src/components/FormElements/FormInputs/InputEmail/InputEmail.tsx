import React, { FC, useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { formStyles } from '@/ui/form/form.module';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { Colors } from '@/ui/theme/colors';

interface Props extends RenderInputProps {
  editable?: boolean;
}

export const InputEmail: FC<Props> = (props) => {
  const [borderColor, setBorderColor] = useState<Colors>(Colors.LightGray);

  const {
    editable = true,
    onChange,
    value,
    placeholder,
    invalid,
  } = props;

  const onBlur = useCallback(() => setBorderColor(Colors.LightGray), []);
  const onFocus = useCallback(() => setBorderColor(Colors.Gray), []);

  return (
    <TextInput
      onBlur={onBlur}
      onFocus={onFocus}
      placeholderTextColor={Colors.Gray}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      editable={editable}
      autoCapitalize="none"
      textContentType="emailAddress"
      keyboardType="email-address"
      autoCompleteType="email"
      style={[
        formStyles.input,
        { borderColor },
        invalid && formStyles.inputError,
      ]}
    />
  );
};
