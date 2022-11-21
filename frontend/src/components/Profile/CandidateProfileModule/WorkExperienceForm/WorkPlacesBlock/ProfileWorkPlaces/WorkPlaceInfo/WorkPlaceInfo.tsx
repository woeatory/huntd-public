import React, {
  Dispatch, FC, SetStateAction,
} from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfileWorkPlace } from '@/controllers/graphql/generated';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { useDeleteWorkPlace } from '@/controllers/workPlace/workPlace.hooks/useDeleteWorkPlace';
import typography from '@/ui/typography/typography.module.scss';
import { IconEdit } from '@/ui/icons/general/IconEdit';
import { IconTrash } from '@/ui/icons/general/IconTrash';
import { useCandidateProfileWorkPlaceDuration } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileWorkPlaceDuration';
import styles from '../ProfileWorkPlaces.module.scss';

interface Props {
  workPlace: CandidateProfileWorkPlace;
  setIsEdited: Dispatch<SetStateAction<boolean>>;
  initialStartMonth: SelectOption | null;
  initialEndMonth: SelectOption | null;

}

export const WorkPlaceInfo: FC<Props> = (props) => {
  const [deleteWorkplace, { loading: deleteLoading }] = useDeleteWorkPlace();

  const getDuration = useCandidateProfileWorkPlaceDuration();

  const loading = deleteLoading;

  const { t } = useTranslation([Namespaces.Profile, Namespaces.Validations]);

  const {
    workPlace, setIsEdited, initialEndMonth, initialStartMonth,
  } = props;

  const { duration } = getDuration(
    workPlace.startDate, workPlace?.endDate,
  );

  const startDateInfo = `${initialStartMonth?.label?.slice(0, 3)} ${workPlace?.startDate.slice(0, 4)}`;

  let endDateInfo;

  if (initialEndMonth && workPlace?.endDate) {
    endDateInfo = `${initialEndMonth?.label?.slice(0, 3)} ${workPlace.endDate.slice(0, 4)}`;
  } else {
    endDateInfo = t(`${Namespaces.Profile}:current_time`);
  }

  const handleDelete = async () => {
    if (workPlace) {
      await deleteWorkplace({
        variables: {
          id: workPlace.id,
        },
      });
    }
  };

  return (
    <div className={cn(styles.workPlaceContainer, 'cell large-7 large-offset-3 mb-24')}>
      <WithLoader loading={loading}>
        <div className="c-semidark-chocolate mb-16">
          <div className={styles.headingContainer}>
            <p className={typography.caption}>{workPlace?.title}</p>
            <div>
              <button
                type="button"
                className={cn(styles.deleteButton, 'mr-16')}
                onClick={() => setIsEdited(true)}
              >
                <IconEdit />
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                <IconTrash />
              </button>
            </div>

          </div>

          <p className={typography.smallText}>{workPlace?.companyName}</p>
        </div>
        <div className={cn(typography.smallText, styles.termsContainer, 'c-semidark-chocolate mb-8')}>
          <span className={styles.term}>
            {`${startDateInfo} - ${endDateInfo}`}
          </span>
          <span className={styles.dot} />
          <span className={cn(styles.term, 'c-semidark-chocolate')}>{duration}</span>
        </div>
        <p className={cn(styles.descriptionInput, typography.smallText, 'c-semidark-chocolate')}>
          {workPlace?.description}
        </p>
      </WithLoader>
    </div>
  );
};
