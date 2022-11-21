import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';
import cn from 'classnames';
import Cleave from 'cleave.js/react';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  ref?: any
}

const normalizeValue = (value: string) => value.replace(/\s/g, '');

export const InputNumberUi: FC<Props> = (props) => {
  const {
    onChange, className, ...rest
  } = props;

  return (
    <Cleave
      className={cn(className, FormInputs.input)}
      inputMode="numeric"
      options={{
        numeral: true,
        numeralPositiveOnly: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' ',
      }}
      onChange={(e) => {
        if (onChange) {
          Object.assign(
            e.target,
            { value: normalizeValue(e.target.value) },
          );

          onChange(e);
        }
      }}
      {...rest}
    />
  );
};

export const InputNumber = withHookFormController({})(
  InputNumberUi,
);
