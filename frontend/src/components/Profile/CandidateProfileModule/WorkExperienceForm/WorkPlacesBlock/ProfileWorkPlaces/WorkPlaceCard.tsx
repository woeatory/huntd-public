import React, {
  Dispatch, FC, SetStateAction, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { CandidateProfileWorkPlace } from '@/controllers/graphql/generated';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { Select } from '@/components/FormElements/Select';
import { InputNumber } from '@/components/FormElements/FormInputs/InputNumber';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { IconChevronDown } from '@/ui/icons/general/IconChevronDown';
import { Switcher, Switches } from '@/components/Switcher';
import { InputTextArea } from '@/components/FormElements/FormInputs/InputTextArea';
import { Button } from '@/ui/buttons/Button';
import { useCreateWorkPlace } from '@/controllers/workPlace/workPlace.hooks/useCreateWorkPlace';
import { analytics } from '@/controllers/analytics/analytics.client';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { useUpdateWorkPlace } from '@/controllers/workPlace/workPlace.hooks/useUpdateWorkPlace';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { IconTrash } from '@/ui/icons/general/IconTrash';
import { Tooltip } from '@/components/Base/Tooltip';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { IconIncognito } from '@/ui/icons/general/IconIncognito';
import { WorkPlaceInfo } from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/ProfileWorkPlaces/WorkPlaceInfo';
import typography from '@/ui/typography/typography.module.scss';
import { monthsOptions, monthsMap } from '../workPlaces.constants';
import styles from './ProfileWorkPlaces.module.scss';

interface FormData {
  title: string;
  companyName: string;
  startMonth: SelectOption;
  startYear: number;
  endMonth: SelectOption;
  endYear: number;
  description: string;
}

interface Props {
  workPlace?: CandidateProfileWorkPlace;
  isNewForm?: boolean;
  isOneWorkPlaceMode?: boolean;
  setNewFormActive?: Dispatch<SetStateAction<boolean>>;
  candidateProfileId?: number;
}

export const WorkPlaceCard: FC<Props> = (props) => {
  const {
    workPlace,
    setNewFormActive,
    isNewForm,
    candidateProfileId,
    isOneWorkPlaceMode,
  } = props;

  const {
    handleSubmit, getValues, errors,
    setValue, control, formState, reset, setError,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [createWorkplace, { loading: creationLoading }] = useCreateWorkPlace();
  const [updateWorkplace, { loading: updateLoading }] = useUpdateWorkPlace();
  const [
    updateProfile,
    { loading: profileLoading },
  ] = useUpdateCandidateProfile();

  const loading = creationLoading
    || updateLoading
    || profileLoading;

  const [initialFormValues, setInitialFormValues] = useState<FormData>(
    {
      title: '',
      companyName: '',
      description: '',
      startMonth: { value: '', label: '' },
      startYear: 0,
      endMonth: { value: '', label: '' },
      endYear: 0,
    },
  );

  const { t } = useTranslation([
    Namespaces.Profile,
    Namespaces.Validations,
    Namespaces.Form,
  ]);

  const [isEdited, setIsEdited] = useState(false);

  const [
    isEndDate,
    setIsEndDate,
  ] = useState<boolean>(Boolean(workPlace?.endDate));

  const initialStartMonth = useMemo(() => {
    if (workPlace?.startDate) {
      const initialStartDate = new Date(workPlace.startDate).getMonth();

      return {
        value: initialStartDate.toString(),
        label: monthsMap.get(initialStartDate) ?? '',
      };
    }

    return null;
  }, [workPlace?.startDate]);

  const initialEndMonth = useMemo(() => {
    if (workPlace?.endDate) {
      const initialEndDate = new Date(workPlace.endDate).getMonth();

      return {
        value: initialEndDate.toString(),
        label: monthsMap.get(initialEndDate) ?? '',
      };
    }

    return null;
  }, [workPlace?.endDate]);

  useEffect(() => {
    if (initialStartMonth) {
      setValue('startMonth', initialStartMonth);
    }

    if (initialEndMonth) {
      setValue('endMonth', initialEndMonth);
    }
  }, [initialEndMonth, initialStartMonth, setValue, isEdited]);

  useEffect(() => {
    setInitialFormValues(getValues());
  }, [getValues]);

  const shouldActionsBeShown = formState.isDirty || isNewForm;

  const onSubmit = handleSubmit(async (data) => {
    const {
      title, companyName, description,
      startMonth, startYear, endMonth, endYear,
    } = data;

    if (+data.endYear < +data.startYear) {
      setError('endYear', {
        type: 'validation',
        message: t(`${Namespaces.Validations}:incorrect_end_date`),
      });

      return;
    }

    if (+data.startYear === +data.endYear
        && +data.endMonth.value < +data.startMonth.value) {
      setError('endMonth', {
        type: 'validation',
        message: t(`${Namespaces.Validations}:incorrect_end_date`),
      });

      return;
    }

    const startDate = `${startYear}-${+startMonth.value + 1}`;
    let endDate;

    if (endYear && endMonth) {
      endDate = `${endYear}-${+endMonth.value + 1}`;
    }

    const editedWorkPlace = {
      title,
      companyName,
      description: description || null,
      startDate,
      endDate: endDate || null,
    };

    if (isNewForm && candidateProfileId && setNewFormActive) {
      const createdWorkPlace = {
        candidateProfileId,
        ...editedWorkPlace,
      };

      await createWorkplace({
        variables: createdWorkPlace,
      });

      analytics.sendEvent(
        analytics.events.workPlaces.WorkPlaceCreated,
        { candidateProfileId },
      );

      setNewFormActive(false);

      await updateProfile();
    } else if (workPlace) {
      const updatedWorkplace = {
        id: workPlace.id,
        ...editedWorkPlace,
      };

      await updateWorkplace({
        variables: updatedWorkplace,
      });

      analytics.sendEvent(
        analytics.events.workPlaces.WorkPlaceUpdated,
        { candidateProfileId },
      );
    }

    await updateProfile();

    setInitialFormValues(getValues());
    reset({
      title,
      companyName,
      description,
      startMonth,
      startYear,
      endMonth,
      endYear,
    });
    setIsEdited(false);
  });

  const discardChanges = () => {
    if (isNewForm && setNewFormActive) {
      setNewFormActive(false);
    }

    reset(initialFormValues);
  };

  const handleClose = () => {
    if (isNewForm && setNewFormActive) {
      setNewFormActive(false);
    } else {
      setIsEdited(false);
    }
  };

  return (
    <>
      {isEdited || isNewForm ? (
        <div className="cell large-7 large-offset-3 mb-24">
          <form className={styles.workPlaceContainer} onSubmit={onSubmit}>
            <WithLoader loading={loading && !isOneWorkPlaceMode}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
              >
                <IconTrash />
              </button>

              <FormField
                label={{
                  for: 'title',
                  text: t(`${Namespaces.Profile}:workplaces_role`),
                }}
                className={cn(styles.formInput, 'mb-16')}
                error={errors.title}
                renderInput={(fieldProps) => (
                  <InputText
                    {...fieldProps}
                    name='title'
                    id='title'
                    control={control}
                    defaultValue={workPlace?.title}
                    validation={{
                      required: {
                        value: true,
                        message: 'role_is_required',
                      },
                    }}
                    placeholder={t(`${Namespaces.Profile}:workplaces_role_placeholder`)}
                  />
                )}
                disabled={loading}
              />

              <FormField
                label={{
                  for: 'companyName',
                  text: t(`${Namespaces.Profile}:workplaces_company_name`),
                }}
                renderLabelIcon={() => (
                  <span className={styles.iconContainer}>
                    <Tooltip
                      text={t(`${Namespaces.Form}:work_place_incognito_label`)}
                      position={TooltipPositions.Top}
                      renderIcon={() => <IconIncognito />}
                    />
                  </span>
                )}
                className={cn(styles.formInput, 'mb-16')}
                error={errors.companyName}
                renderInput={(fieldProps) => (
                  <InputText
                    {...fieldProps}
                    disabled={loading}
                    name='companyName'
                    id='companyName'
                    control={control}
                    defaultValue={workPlace?.companyName}
                    placeholder={t(`${Namespaces.Profile}:workplaces_company_name`)}
                    validation={{
                      required: {
                        value: true,
                        message: 'company_name_is_required',
                      },
                    }}
                  />
                )}
                disabled={false}
              />

              <div className={cn(styles.dateContainer, styles.formInput, 'mb-16')}>
                <FormField
                  className={cn(styles.dateInput)}
                  disabled={loading}
                  label={{
                    for: 'startMonth',
                    text: t(`${Namespaces.Profile}:start_date`),
                  }}
                  error={errors.startMonth as any}
                  renderInput={(inputProps) => (
                    <Select
                      {...inputProps}
                      className={styles.dateInput}
                      control={control}
                      disabled={loading}
                      validation={{
                        required: {
                          value: true,
                          message: 'start_month_is_required',
                        },
                      }}
                      name="startMonth"
                      id="startMonth"
                      options={monthsOptions}
                      placeholder={t(`${Namespaces.Profile}:month_placeholder`)}
                      components={{
                        DropdownIndicator: () => (
                          <>
                            <IconChevronDown />
                          </>
                        ),
                      }}
                    />
                  )}
                />
                <FormField
                  className={styles.dateInput}
                  error={errors.startYear}
                  renderInput={(renderProps) => (
                    <InputNumber
                      {...renderProps}
                      className={styles.dateInput}
                      options={{
                        numeralThousandsGroupStyle: 'none',
                      }}
                      name="startYear"
                      control={control}
                      validation={{
                        required: {
                          value: true,
                          message: 'start_year_is_required',
                        },
                        min: {
                          value: 1925,
                          message: 'min_year_error',
                        },
                        maxLength: {
                          value: 4,
                          message: 'year_format_error',
                        },
                      }}
                      defaultValue={workPlace?.startDate.slice(0, 4)}
                      placeholder={t(`${Namespaces.Profile}:year_placeholder`)}
                    />
                  )}
                  disabled={loading}
                />

              </div>
              <div className={cn(styles.formInput, 'mb-16')}>
                <span className={cn(typography.smallText, 'c-gray mb-4')}>
                  {t(`${Namespaces.Profile}:end_date`)}
                </span>
                <Switcher
                  primaryClickHandler={() => setIsEndDate(false)}
                  secondaryClickHandler={() => setIsEndDate(true)}
                  buttonsTexts={[
                    t(`${Namespaces.Profile}:still_working`),
                    t(`${Namespaces.Profile}:set_end_date`),
                  ]}
                  initiallyActive={isEndDate
                    ? Switches.Secondary
                    : Switches.Primary}
                />
              </div>
              {isEndDate && (
                <div className={cn(styles.dateContainer, styles.formInput, 'mb-16')}>
                  <FormField
                    className={styles.dateInput}
                    disabled={loading}
                    error={errors.endMonth as any}
                    renderInput={(inputProps) => (
                      <Select
                        {...inputProps}
                        disabled={loading}
                        className={styles.dateInput}
                        control={control}
                        name="endMonth"
                        id="endMonth"
                        options={monthsOptions}
                        placeholder={t(`${Namespaces.Profile}:month_placeholder`)}
                        components={{
                          DropdownIndicator: () => (
                            <>
                              <IconChevronDown />
                            </>
                          ),
                        }}
                      />
                    )}
                  />

                  <FormField
                    className={styles.dateInput}
                    error={errors.endYear}
                    disabled={loading}
                    renderInput={(renderProps) => (
                      <InputNumber
                        {...renderProps}
                        className={styles.dateInput}
                        options={{
                          numeralThousandsGroupStyle: 'none',
                        }}
                        validation={{
                          min: {
                            value: 1925,
                            message: 'min_year_error',
                          },
                          maxLength: {
                            value: 4,
                            message: 'year_format_error',
                          },
                        }}
                        disabled={loading}
                        name="endYear"
                        id="endYear"
                        control={control}
                        defaultValue={workPlace?.endDate?.slice(0, 4) || ''}
                        placeholder={t(`${Namespaces.Profile}:year_placeholder`)}
                      />
                    )}
                  />
                </div>
              )}
              <FormField
                label={{
                  for: 'description',
                  text: t(`${Namespaces.Profile}:workplace_description_title`),
                }}
                disabled={loading}
                className="mb-16"
                renderInput={(renderProps) => (
                  <InputTextArea
                    {...renderProps}
                    rows={5}
                    defaultValue={workPlace?.description || ''}
                    name="description"
                    id="description"
                    control={control}
                    placeholder={t(`${Namespaces.Profile}:workplace_description_placeholder`)}
                  />
                )}
              />
              {shouldActionsBeShown && (
                <div className={styles.buttonsContainer}>
                  <Button
                    disabled={loading}
                    className={styles.actionButton}
                    size={Button.size.Small}
                    mode={Button.mode.Primary}
                    text={t(`${Namespaces.Profile}:save`)}
                    type="submit"
                  />
                  <Button
                    disabled={loading}
                    className={styles.actionButton}
                    mode={Button.mode.Secondary}
                    size={Button.size.Small}
                    text={t(`${Namespaces.Profile}:discard_changes`)}
                    onClick={discardChanges}
                  />
                </div>
              )}
            </WithLoader>
          </form>
        </div>
      ) : workPlace && (
        <WorkPlaceInfo
          workPlace={workPlace}
          setIsEdited={setIsEdited}
          initialStartMonth={initialStartMonth}
          initialEndMonth={initialEndMonth}
        />
      )}
    </>
  );
};
