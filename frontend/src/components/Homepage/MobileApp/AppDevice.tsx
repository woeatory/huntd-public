import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { IconLogo } from '@/ui/icons/custom/IconLogo';
import { IconMobileAppQR } from '@/ui/icons/general/IconMobileAppQR';
import { AppButtons } from '@/components/Homepage/MobileApp/AppsButtons';
import styles from './AppDevice.module.scss';

interface Options {
  buttonsClassName?: string;
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > & Options;

export const AppDevice: FC<Props> = ({ className, buttonsClassName }) => (
  <div className={cn(styles.device, className)}>
    <IconLogo />

    <div className={styles.deviceQR}>
      <IconMobileAppQR />
    </div>

    <AppButtons
      className={styles.deviceButtons}
      buttonsClassName={buttonsClassName}
    />
  </div>
);
