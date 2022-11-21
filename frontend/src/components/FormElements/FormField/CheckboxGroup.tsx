import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './FormField.module.scss';

interface Props {
  className?: string;
  error?: FieldError;
  label?: string;
}

export const CheckboxGroup: FC<Props> = (props) => {
  const {
    children, error, className, label,
  } = props;

  const { t } = useTranslation([Namespaces.Validations]);

  const errorMessage = error?.message || error?.type;

  return (
    <div className={cn(styles.fieldWrapper, className)}>
      {label && (
        <span className={cn(styles.label, 'mb-8')}>{label}</span>
      )}

      {children}

      <div className={cn(styles.metaBlock, 'mt-4')}>
        {errorMessage && t(`${Namespaces.Validations}:${errorMessage}`)}
      </div>
    </div>
  );
};
