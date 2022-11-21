import React, { FC } from 'react';
import { FieldError, ValidationRules } from 'react-hook-form';
import cn from 'classnames';
import { FORM_CLASSES } from '@/controllers/form/form.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './FormField.module.scss';

interface LabelProps {
  for: string;
  text: string;
}
interface Props {
  renderLabelIcon?: () => JSX.Element;
  label?: LabelProps;
  error?: FieldError;
  renderInput: <T>(props: T & {rules?: ValidationRules}) => JSX.Element;
  className?: string;
  disabled: boolean;
}
export const FormField: FC<Props> = (props) => {
  const {
    label,
    error,
    className,
    renderInput,
    disabled,
    renderLabelIcon,
  } = props;

  const { t } = useTranslation([Namespaces.Validations]);

  const errorMessage = error?.message || error?.type;

  return (
    <div className={cn(styles.fieldWrapper, className)}>
      {label && (
        <label
          htmlFor={label.for}
          className={cn(styles.label, 'mb-4')}
        >
          {label.text}
          {renderLabelIcon && renderLabelIcon()}
        </label>
      )}
      <div className={styles.inputBlock}>
        {renderInput({
          'aria-invalid': error,
          'aria-disabled': disabled,
          disabled,
          className: cn({
            [FORM_CLASSES.invalid]: !!error,
          }),
          id: label?.for,
        })}
      </div>
      <div className={cn(styles.metaBlock, 'mt-4')}>
        {errorMessage && t(`${Namespaces.Validations}:${errorMessage}`)}
      </div>
    </div>
  );
};
