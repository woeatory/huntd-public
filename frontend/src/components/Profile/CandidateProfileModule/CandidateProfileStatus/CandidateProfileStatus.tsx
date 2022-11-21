import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const CandidateProfileStatus: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  const [profile] = useLatestCandidateProfile();

  return (
    <small
      className={cn(typography.overhead, 'c-gray', className)}
      {...rest}
    >
      {t(`${Namespaces.Profile}:profile_status_${profile?.status}`)}
    </small>
  );
};
