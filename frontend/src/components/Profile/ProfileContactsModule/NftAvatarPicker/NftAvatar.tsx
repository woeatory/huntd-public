import React, { FC } from 'react';
import cn from 'classnames';
import { Image } from '@/components/Base/Image/Image';
import { IconHexagon } from '@/ui/icons/general/IconHexagon';
import styles from './NftAvatar.module.scss';

interface Props {
  url?: string;
  resolution: number;
  iconClass?: string;
  hexagonClass?: string;
  className?: string;
  toggleMenu?: () => void;
}

export const NftAvatar: FC<Props> = ({
  url,
  resolution,
  iconClass,
  hexagonClass,
  className,
  toggleMenu,
}) => (
  <div
    aria-hidden
    className={cn(styles.avatarWrapper, className)}
    onClick={toggleMenu}
  >
    <div className={cn(styles.iconWrapper, iconClass)}>
      <IconHexagon />
    </div>
    <div className={cn(styles.hexagonWrapper, hexagonClass)}>
      {url && (
      <Image
        src={url}
        width={resolution}
        height={resolution}
        objectFit="cover"
      />
      )}
    </div>
  </div>
);
