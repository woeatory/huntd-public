import React from 'react';
import { Control, Controller, ValidationRules } from 'react-hook-form';

interface WithHookFormControllerOptions {
  rules?: ValidationRules;
}
export const withHookFormController = (
  options: WithHookFormControllerOptions,
) => <P, >(InputUI: React.ComponentType<P>) => {
  interface Props {
    control: Control,
    name: string,
    validation?: ValidationRules,
    defaultValue?: string | number[] | number,
  }

  const {
    rules = {},
  } = options;

  return (props: P & Props) => {
    const {
      control, validation, defaultValue, name, ...rest
    } = props;

    const validationRules: ValidationRules = {
      ...rules,
      ...validation,
    };

    return (
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        defaultValue={defaultValue ?? ''}
        render={(inputProps) => (
          // TODO: remove any from input props
          <InputUI
            {...rest}
            {...inputProps as any}
          />
        )}
      />
    );
  };
};
