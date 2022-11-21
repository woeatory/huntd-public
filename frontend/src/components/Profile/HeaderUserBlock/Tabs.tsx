import React, { FC, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Selectors } from '@/lib/selectors';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import styles from '@/components/Profile/HeaderUserBlock/Tabs.module.scss';

interface Props {
  type: PrimaryProfile;
  setType: Dispatch<SetStateAction<PrimaryProfile>>;
}

export const Tabs: FC<Props> = ({ setType, type }) => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn(styles.tabsContainer)}>
      <Button
        className={cn(styles.tabButton, {
          [Selectors.Active]: type === PrimaryProfile.Candidate,
        })}
        onClick={() => setType(PrimaryProfile.Candidate)}
        text={t(`${Namespaces.Common}:burger_candidate_tab`)}
      />

      <Button
        className={cn(styles.tabButton, {
          [Selectors.Active]: type === PrimaryProfile.Recruiter,
        })}
        onClick={() => setType(PrimaryProfile.Recruiter)}
        text={t(`${Namespaces.Common}:burger_recruiter_tab`)}
      />
    </div>
  );
};
