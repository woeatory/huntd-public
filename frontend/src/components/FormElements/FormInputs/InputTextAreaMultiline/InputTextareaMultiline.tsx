import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

interface Props extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
  > {
  ref?: any
  value?: string
}

export const InputTextAreaMultilineUi: FC<Props> = React.forwardRef((
  props, ref,
) => {
  const { className, ...rest } = props;

  return (
    <TextareaAutosize
      ref={ref}
      maxRows={8}
      className={cn(className, FormInputs.textarea)}
      {...rest}
    />
  );
});

export const InputTextAreaMultiline = withHookFormController({})(
  InputTextAreaMultilineUi,
);
