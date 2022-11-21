import React, { DetailedHTMLProps, Ref, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export const InputTextAreaUi = React.forwardRef((
  props: Props, ref: Ref<HTMLTextAreaElement>,
) => {
  const { className, ...rest } = props;

  return (
    <textarea
      className={cn(className, FormInputs.textarea)}
      rows={4}
      ref={ref}
      {...rest}
    />
  );
});

export const InputTextArea = withHookFormController({})(
  InputTextAreaUi,
);
