import cn from 'classnames';
import React, { useMemo, FC } from 'react';
import { FCIcon } from '@/ui/icons/typedefs';
import { Selectors } from '@/lib/selectors';
import {
  AnchorElementProps,
  ButtonElementProps, ButtonORAnchorCommonAttributes,
} from '@/ui/buttons/typedefs';
import { ButtonBody } from '@/ui/buttons/ButtonBody';
import { ButtonElement } from '@/ui/buttons/ButtonElement';
import { AnchorElement } from '@/ui/buttons/AnchorElement';
import { Loader } from '@/ui/Loader';

import styles from '@/ui/buttons/buttons.module.scss';

enum ButtonMode {
  Primary = 'primary',
  Secondary = 'secondary',
  IconOnly = 'icon-only',
  Transparent = 'transparent',
  BorderLess = 'borderless'
}

enum ButtonSize {
  Tiny= 'tiny',
  Small = 'small',
  SmallWide = 'smallWide',
  LargeWide = 'largeWide',
}

interface CustomProps {
  mode?: ButtonMode;
  size?: ButtonSize;
  LeftIcon?: FCIcon,
  RightIcon?: FCIcon,
  text?: string;
  isLoading?: boolean;
}

export type Props = ButtonORAnchorCommonAttributes
  & AnchorElementProps
  & ButtonElementProps
  & CustomProps;

  type ButtonType = FC<Props> & {
    mode: typeof ButtonMode;
    size: typeof ButtonSize;
  };

export const Button: ButtonType = (props) => {
  const {
    isLoading = false,
    className,
    text,
    LeftIcon,
    RightIcon,
    // Anchor props
    download,
    href,
    hrefLang,
    media,
    ping,
    rel,
    target,
    referrerPolicy,
    title,
    // Button props
    autoFocus,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    name,
    value,
    disabled = false,
    type = 'button',
    // Rest props
    mode = '',
    size = '',
    ...rest
  } = props;

  const hasIcon = !!(LeftIcon || RightIcon);
  const hasOnlyIcon = hasIcon
    && !(LeftIcon && RightIcon)
    && !text;

  const body = useMemo(() => (
    <ButtonBody
      LeftIcon={LeftIcon}
      RightIcon={RightIcon}
      text={text}
      hasOnlyIcon={hasOnlyIcon}
    />
  ),
  [text, LeftIcon, RightIcon, hasOnlyIcon]);

  const child = useMemo(() => (
    isLoading
      ? (
        <>
          <span className={styles.transparentContent}>
            {body}
          </span>
          <Loader
            active={isLoading}
          />
        </>
      )
      : body
  ), [isLoading, body]);

  return href
    ? (
      <AnchorElement
        className={cn(
          styles[mode],
          styles[size],
          className,
          {
            [Selectors.Disabled]: disabled,
          },
        )}
        download={download}
        href={href}
        hrefLang={hrefLang}
        media={media}
        ping={ping}
        rel={rel}
        target={target}
        title={title}
        referrerPolicy={referrerPolicy}
        {...rest}
      >
        {child}
      </AnchorElement>
    )
    : (
      <ButtonElement
        type={type}
        disabled={disabled}
        isLoading={isLoading}
        className={cn(
          styles[mode],
          styles[size],
          className,
          {
            [Selectors.Disabled]: disabled,
          },
        )}
        autoFocus={autoFocus}
        form={form}
        formAction={formAction}
        formEncType={formEncType}
        formMethod={formMethod}
        formNoValidate={formNoValidate}
        formTarget={formTarget}
        name={name}
        value={value}
        {...rest}
      >
        {child}
      </ButtonElement>
    );
};

Button.mode = ButtonMode;
Button.size = ButtonSize;
