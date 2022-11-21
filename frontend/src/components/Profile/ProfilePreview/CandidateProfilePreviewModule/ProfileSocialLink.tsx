import React, { FC } from 'react';
import { IconArrowLeft } from '@/ui/icons/general/IconArrowLeft';

interface Props {
  link: string,
  title: string,
  className: string,
}

export const ProfileSocialLink: FC<Props> = ({ link, title, className }) => (
  <a
    href={link}
    className={className}
    target="_blank"
    rel="noreferrer"
  >
    <span>{title}</span>

    <IconArrowLeft />
  </a>
);
