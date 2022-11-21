import React, { FC, useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import { formStyles } from '@/ui/form/form.module';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { Colors } from '@/ui/theme/colors';

interface Props extends RenderInputProps {
  height?: number;
  editable?: boolean;
}

export const TextArea: FC<Props> = (props) => {
  const [borderColor, setBorderColor] = useState<Colors>(Colors.LightGray);

  const {
    editable = true,
    height = 100,
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
      multiline
      numberOfLines={10}
      style={[
        formStyles.input,
        invalid && formStyles.inputError,
        { height, paddingTop: 16, borderColor },
      ]}
    />
  );
};
