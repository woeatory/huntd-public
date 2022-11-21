import React, { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { Selectors } from '@/lib/selectors';
import styles from './Switcher.module.scss';

export enum Switches {
  Primary = 'primary',
  Secondary = 'secondary',
}
export interface SwitcherProps {
  className?: string;
  primaryClickHandler: () => void;
  secondaryClickHandler: () => void;
  buttonsTexts: [string, string];
  initiallyActive?: Switches;
}

export const Switcher: FC<
  SwitcherProps
> = React.memo<SwitcherProps>((props) => {
  const {
    primaryClickHandler, secondaryClickHandler,
    buttonsTexts, className, initiallyActive, ...rest
  } = props;
  const [primaryText, secondaryText] = buttonsTexts;

  const [activeButton, setActiveButton] = useState<Switches>(
    initiallyActive ?? Switches.Primary,
  );

  useEffect(() => {
    if (initiallyActive) {
      if (initiallyActive === Switches.Primary) {
        setActiveButton(Switches.Primary);
      } else {
        setActiveButton(Switches.Secondary);
      }
    }
  }, [initiallyActive]);

  return (
    <div className={cn(styles.switcher, className)}>
      <button
        type="button"
        onClick={() => {
          primaryClickHandler();
          setActiveButton(Switches.Primary);
        }}
        className={cn(styles.switcherButton, {
          [Selectors.Active]: activeButton === Switches.Primary,
        })}
        {...rest}
      >
        {primaryText}
      </button>

      <button
        type="button"
        onClick={() => {
          secondaryClickHandler();
          setActiveButton(Switches.Secondary);
        }}
        className={cn(styles.switcherButton, {
          [Selectors.Active]: activeButton === Switches.Secondary,
        })}
        {...rest}
      >
        {secondaryText}
      </button>
    </div>
  );
});
