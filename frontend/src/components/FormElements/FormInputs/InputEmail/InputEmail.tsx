import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';
import cn from 'classnames';
import { ValidationRules } from 'react-hook-form';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

const emailPatternValidation: ValidationRules = {
  pattern: {
    value: /.+@.+\..+/,
    message: 'wrong_email',
  },
};

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputEmailUI: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <input
      className={cn(className, FormInputs.input)}
      type="email"
      {...rest}
    />
  );
};

export const InputEmail = withHookFormController({
  rules: emailPatternValidation,
})(InputEmailUI);
