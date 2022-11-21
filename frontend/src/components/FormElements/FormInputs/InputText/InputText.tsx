import React, { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';
import cn from 'classnames';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputTextUi = React.forwardRef((
  props: Props, ref: Ref<HTMLInputElement>,
) => {
  const { className, ...rest } = props;

  return (
    <input
      className={cn(className, FormInputs.input)}
      type="text"
      ref={ref}
      {...rest}
    />
  );
});

export const InputText = withHookFormController({})(
  InputTextUi,
);
