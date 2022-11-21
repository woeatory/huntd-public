import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { CandidateProfileStatus } from '@/controllers/graphql/generated';

interface ProfileStatusProps {
  status: CandidateProfileStatus;
  clickHandler: () => void;
}

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const ProfileStatus: FC<Props & ProfileStatusProps> = (props) => {
  const {
    className, status,
    clickHandler, ...rest
  } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <small
      aria-hidden
      className={cn(typography.smallText, 'c-gray', className)}
      onClick={clickHandler}
      {...rest}
    >
      {t(`${Namespaces.Profile}:candidate_status_${status}`)}
    </small>
  );
};
