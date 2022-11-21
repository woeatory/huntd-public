import React, { FC } from 'react';
import cn from 'classnames';
import styles from './SocialLink.module.scss';

interface Props {
  title: string;
  link: string;
}

export const SocialLink: FC<Props> = (props) => {
  const { children, title, link } = props;

  return (
    <a
      title={title}
      href={link}
      className={cn(styles.socialIcon)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
