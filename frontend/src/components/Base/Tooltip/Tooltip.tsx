import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { IconInfo } from '@/ui/icons/general/IconInfo';
import styles from './Tooltip.module.scss';

interface Options {
  text: string;
  position: string;
  renderIcon?: () => JSX.Element;
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & Options

export const Tooltip: FC<Props> = ({
  className,
  text,
  position,
  renderIcon,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.icon}>
      {renderIcon
        ? renderIcon()
        : (
          <IconInfo />
        )}
    </div>

    <div className={cn({
      [styles.toolTipBottom]: position === TooltipPositions.Bottom,
      [styles.toolTipTop]: position === TooltipPositions.Top,
    },
    styles.toolTip, className)}
    >
      <p className={typography.smallText}>
        {text}
      </p>
    </div>
  </div>

);
