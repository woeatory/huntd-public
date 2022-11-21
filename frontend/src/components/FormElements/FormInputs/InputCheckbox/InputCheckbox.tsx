import React, { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';
import cn from 'classnames';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import styles from './InputCheckbox.module.scss';

interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
}

export const InputCheckboxUi = React.forwardRef((
  props: Props, ref: Ref<HTMLInputElement>,
) => {
  const { className, label, ...rest } = props;

  return (
    <label className={cn(
      className,
      styles.label,
      styles.checkBoxContainer,
    )}
    >
      <span>
        <input
          className={styles.checkBox}
          type="checkbox"
          ref={ref}
          {...rest}
        />
        <span className={styles.checkLabel}>
          <IconCheck />
        </span>
      </span>
      <span>{label}</span>
    </label>
  );
});
