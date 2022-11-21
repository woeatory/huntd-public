import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Image } from '@/components/Base/Image/Image';
import { CandidateProfileStatus, RecruiterProfileStatus, UploadedFile } from '@/controllers/graphql/generated';
import styles from './Avatar.module.scss';

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  avatar: UploadedFile | null | undefined;
  toggleMenu?: () => void;
  status?: CandidateProfileStatus | RecruiterProfileStatus;
}

export const Avatar: FC<Props> = ({
  toggleMenu,
  className,
  avatar,
  status,
}) => (
  <div
    aria-hidden
    className={cn(
      className,
      {
        [styles.userAvatarActive]: (
          status === CandidateProfileStatus.Active
          || status === RecruiterProfileStatus.Active
        ),
        [styles.userAvatarRejected]: (
          status === CandidateProfileStatus.Rejected
        ),
        [styles.userAvatar]: avatar,
        [styles.userAvatarEmpty]: !avatar,
      },
    )}
    onClick={toggleMenu}
  >
    {avatar && (
      <Image
        src={avatar.url}
        width={70}
        height={70}
        objectFit="cover"
        className={styles.userAvatarPhoto}
      />
    )}
  </div>
);
