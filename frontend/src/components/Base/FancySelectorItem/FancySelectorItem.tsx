import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import styles from './FancySelectorItem.module.scss';

interface Props extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {
  overhead: string;
  content: string;
  renderIcon?: () => JSX.Element
}

export const FancySelectorItem = React.forwardRef<HTMLAnchorElement, Props>(
  (props, ref) => {
    const {
      className, content, overhead, renderIcon, ...rest
    } = props;

    return (
      <a
        ref={ref}
        className={cn(className, styles.selectorItem)}
        {...rest}
      >
        {!!renderIcon && (
          <span className={styles.iconContainer}>{renderIcon()}</span>
        )}

        <span>
          <p className={cn(styles.selectorOverhead, 'mb-8')}>
            {overhead}
          </p>

          <p className={styles.selectorContent}>
            {content}
          </p>
        </span>
      </a>
    );
  },
);
