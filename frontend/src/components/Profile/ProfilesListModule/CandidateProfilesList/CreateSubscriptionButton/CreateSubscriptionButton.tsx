import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { useCreateSubscription } from '@/controllers/subscription/subscription.hooks/useCreateSubscription';
import styles from './CreateSubscriptionButton.module.scss';

interface Options {
  labelText?: string
  labelClassName?: string
  buttonText: string
  buttonClassName?: string
  withLabel: boolean
  disabled?: boolean
  callback?: () => void;
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & Options

export const CreateSubscriptionButton: FC<Props> = (options) => {
  const { subscribe, loading } = useCreateSubscription();
  const {
    className, labelText, labelClassName,
    buttonClassName, buttonText,
    disabled, callback, withLabel,
  } = options;

  const handleSubscribe = async () => {
    await subscribe();
    if (callback) {
      callback();
    }
  };

  const isDisabled = disabled || loading;

  return (
    <div className={className}>
      {withLabel && (
        <p className={labelClassName}>
          {labelText}
        </p>
      )}

      <Button
        type="button"
        mode={Button.mode.Primary}
        className={cn(buttonClassName, styles.notifyButton)}
        text={buttonText}
        onClick={handleSubscribe}
        disabled={isDisabled}
      />
    </div>
  );
};
