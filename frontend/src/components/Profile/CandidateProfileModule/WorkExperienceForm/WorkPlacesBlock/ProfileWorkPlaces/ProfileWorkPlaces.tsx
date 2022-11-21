import React, {
  Dispatch,
  FC, SetStateAction, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfileWorkPlace } from '@/controllers/graphql/generated';
import { WorkPlaceCard } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/ProfileWorkPlaces/WorkPlaceCard';
import typography from '@/ui/typography/typography.module.scss';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { Button } from '@/ui/buttons/Button';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import { IconArrowReload } from '@/ui/icons/general/IconArrowReload';
import { CandidateProfileRoutes } from '@/controllers/router/router.constants';
import styles from './ProfileWorkPlaces.module.scss';

interface Props {
  profileWorkPlaces: CandidateProfileWorkPlace[];
  setIsOneWorkPlaceMode: Dispatch<SetStateAction<boolean>>;
  candidateProfileId: number;
  openModal: () => void;
}

export const ProfileWorkPlaces: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Profile]);

  const router = useRouter();

  const {
    profileWorkPlaces,
    candidateProfileId,
    openModal,
    setIsOneWorkPlaceMode,
  } = props;

  const [addWorkPlaceFormActive, setAddWorkPlaceFormActive] = useState(false);

  const sortedWorkPlaces = useMemo(() => [...profileWorkPlaces].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  ), [profileWorkPlaces]);

  return (
    <>
      <div className={cn(styles.headingContainer, 'cell large-7 large-offset-3 mb-8')}>
        <p className={cn(typography.caption)}>
          {t(`${Namespaces.Profile}:workplaces_job_experience`)}
        </p>
        <button
          className={cn(styles.addButton)}
          onClick={() => {
            setAddWorkPlaceFormActive((prev) => !prev);
            setIsOneWorkPlaceMode(false);
          }}
        >
          {addWorkPlaceFormActive
            ? <IconMinus />
            : <IconPlus />}

          <p className={cn(typography.alertCaption, 'ml-4')}>
            {addWorkPlaceFormActive
              ? t(`${Namespaces.Profile}:cancel_label`)
              : t(`${Namespaces.Profile}:add_label`)}
          </p>
        </button>
      </div>

      <div className={(cn('cell medium-5 large-3 large-offset-3 mb-16'))}>
        <Button
          className={styles.reloadButton}
          mode={Button.mode.BorderLess}
          size={Button.size.Small}
          text={t(`${Namespaces.Profile}:reload`)}
          onClick={openModal}
          LeftIcon={IconArrowReload}
        />
      </div>

      {addWorkPlaceFormActive && (
      <WorkPlaceCard
        isNewForm
        setNewFormActive={setAddWorkPlaceFormActive}
        candidateProfileId={candidateProfileId}
      />
      )}

      {sortedWorkPlaces.map((workPlace) => (
        <WorkPlaceCard
          workPlace={workPlace}
          key={workPlace.id}
        />
      ))}

      <div className={(cn('cell large-7 large-offset-3 mb-16 mt-8'))}>
        <p className={cn(typography.smallText, 'c-gray mb-8')}>
          {t(`${Namespaces.Profile}:experience_seem_not_up_to_date`)}
        </p>
        <Button
          className={styles.fetchButton}
          mode={Button.mode.Secondary}
          size={Button.size.SmallWide}
          text={t(`${Namespaces.Profile}:fetch`)}
          onClick={async () => {
            openModal();

            await router.push(`${CandidateProfileRoutes.Experience}?refetch=linkedin`);
          }}
        />
      </div>
    </>
  );
};
