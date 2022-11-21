import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from 'react';
import cn from 'classnames';
import FormInputs
  from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import styles
  from '@/components/FormElements/FormInputs/InputPassword/InputPassword.module.scss';
import { IconEyeOn } from '@/ui/icons/general/IconEyeOn';
import { IconEyeOff } from '@/ui/icons/general/IconEyeOff';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { withoutVisibilityToggler?: boolean }

export const InputPasswordUi: FC<Props> = (props) => {
  const { className, withoutVisibilityToggler, ...rest } = props;

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  return (
    <div
      className={cn(FormInputs.wrapper)}
    >
      <input
        className={cn(
          FormInputs.input,
          styles.password,
          className,
        )}
        type={isPasswordVisible ? 'text' : 'password'}
        {...rest}
      />
      {!withoutVisibilityToggler && (
        <label
          className={cn(styles.visibilityTogglerLabel)}
          title="Toggle"
          aria-label="Toggle"
        >
          {isPasswordVisible
            ? <IconEyeOff />
            : <IconEyeOn />}
          <input
            type="checkbox"
            className={cn(styles.visibilityToggler)}
            onChange={(e) => setPasswordVisibility(e.target.checked)}
          />
        </label>
      )}
    </div>
  );
};

// TODO: add pwd validation props (mb min length)
export const InputPassword = withHookFormController({})(
  InputPasswordUi,
);
