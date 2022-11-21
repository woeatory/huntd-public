import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { UploadedFile, User } from '@/controllers/graphql/generated';
import { analytics } from '@/controllers/analytics/analytics.client';

interface Props {
  user: User;
  userCv: UploadedFile;
  removeCv?: () => void;
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
}

export const AttachedCV: FC<Props> = (props) => {
  const {
    user, userCv, removeCv, children, className, iconClassName, linkClassName,
  } = props;

  const fileName = user
    ? `${user?.computedName?.replace(/\s/g, '_')}'s_CV.pdf`
    : userCv.name;

  const { pathname, query } = useRouter();

  return (
    <div className={className}>
      <a
        onClick={() => analytics.sendEvent(
          analytics.events.pageInteraction.CvClicked,
          {
            source: pathname,
            slug: query.slug,
          },
        )}
        href={userCv.url}
        className={linkClassName}
        target="_blank"
        rel="noreferrer"
      >
        {fileName}
      </a>
      {removeCv
        ? (
          <button
            type="button"
            className={iconClassName}
            onClick={removeCv}
          >
            {children}
          </button>
        )
        : (
          <a
            href={userCv.url}
            className={iconClassName}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </a>
        )}
    </div>
  );
};
