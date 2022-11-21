import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const RecruiterProfileStatus: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  const [profile] = useLatestRecruiterProfile();

  return (
    <small
      className={cn(typography.overhead, 'c-gray', className)}
      {...rest}
    >
      {t(`${Namespaces.Profile}:profile_status_${profile?.status}`)}
    </small>
  );
};
