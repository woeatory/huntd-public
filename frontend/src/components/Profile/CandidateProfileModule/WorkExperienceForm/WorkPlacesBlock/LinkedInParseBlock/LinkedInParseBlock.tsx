import React, {
  Dispatch, FC, SetStateAction, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import styles
  from '@/components/Profile/CandidateProfileModule/WorkExperienceForm/WorkPlacesBlock/WorkPlacesBlock.module.scss';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import {
  AuthUserDocument, LatestCandidateProfileDocument,
  FetchWorkPlacesMutationVariables, useFetchWorkPlacesMutation,
  useUpdateProfileContactsMutation, useAdminUserQuery,
} from '@/controllers/graphql/generated';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { SocialLinkPlaceholders, SocialProviders, SOCIAL_LINKS_PATTERNS } from '@/components/Profile/profile.constants';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { CandidateProfileRoutes } from '@/controllers/router/router.constants';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

interface Props {
  setFromLinkedInBlockActive: Dispatch<SetStateAction<boolean>>;
  setIsNoExperienceFetched: Dispatch<SetStateAction<boolean>>;
  candidateProfileId: number;
}

type FormData = Omit<FetchWorkPlacesMutationVariables, 'candidateProfileId'>

export const LinkedInParseBlock: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Validations]);
  const {
    setFromLinkedInBlockActive,
    candidateProfileId,
    setIsNoExperienceFetched,
  } = props;

  const [user] = useAuthUser();

  const { data: adminData } = useAdminUserQuery();

  const router = useRouter();

  const [
    fetchWorkPlacesMutation,
    { data: fetchData, loading: parsing },
  ] = useFetchWorkPlacesMutation({
    refetchQueries: [
      { query: LatestCandidateProfileDocument },
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
  });

  const [
    updateProfile,
    { loading: profileLoading },
  ] = useUpdateCandidateProfile();

  const [updateProfileContacts] = useUpdateProfileContactsMutation();

  const loading = parsing || profileLoading;

  const {
    handleSubmit, setError, control, errors,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const [termsChecked, setTermsChecked] = useState(true);

  useEffect(() => {
    if (fetchData && !loading && !fetchData.fetchWorkPlaces?.length) {
      setIsNoExperienceFetched(true);
    }
  }, [fetchData, setIsNoExperienceFetched, loading]);

  const onSubmit = handleSubmit(async (data) => {
    const { linkedinUrl } = data;

    try {
      await fetchWorkPlacesMutation({
        variables: {
          linkedinUrl,
          candidateProfileId,
          liveScrape: !!router.query.refetch,
        },
      });

      analytics.sendEvent(
        analytics.events.workPlaces.ParsedFromLinkedIn,
        { candidateProfileId },
      );

      await updateProfile();
      await updateProfileContacts({
        variables: {
          linkedinUrl,
        },
      });

      setFromLinkedInBlockActive(false);

      await router.push(CandidateProfileRoutes.Experience);
    } catch (error) {
      const validationErrors = processValidationErrors<
        FetchWorkPlacesMutationVariables
        >(error, setError);

      if (!validationErrors) {
        setError('linkedinUrl', {
          message: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
          type: 'validation',
        });
      }
    }
  });

  return (
    <div className="cell large-6 large-offset-3">
      <form onSubmit={onSubmit}>
        <WithLoader loading={loading}>
          <p className={cn(typography.caption, 'mb-16')}>
            {t(`${Namespaces.Profile}:from_linkedin_title`)}
          </p>
          <FormField
            label={{
              for: 'linkedinUrl',
              text: t(`${Namespaces.Profile}:link_to_linkedin_profile`),
            }}
            error={errors.linkedinUrl}
            className="mb-32"
            disabled={!termsChecked || loading}
            renderInput={(fieldProps) => (
              <InputText
                {...fieldProps}
                id="linkedinUrl"
                name="linkedinUrl"
                placeholder={SocialLinkPlaceholders.Linkedin}
                control={control}
                validation={{
                  required: {
                    value: true,
                    message: 'linkedin_link_is_required',
                  },
                  pattern: {
                    value: SOCIAL_LINKS_PATTERNS[SocialProviders.Linkedin],
                    message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                      social: SocialProviders.Linkedin,
                    }),
                  },
                }}
              />
            )}
          />
          <div className="mb-16">
            <InputCheckboxUi
              className={styles.checkboxLabel}
              label={t(`${Namespaces.Profile}:gdpr_terms_agreement`)}
              name="terms"
              checked={termsChecked}
              disabled={loading}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              mode={Button.mode.Primary}
              className='wide'
              text={t(`${Namespaces.Profile}:import_linkedin_experience`)}
              disabled={!termsChecked || loading}
              type="submit"
            />
            <Button
              mode={Button.mode.Secondary}
              text={t(`${Namespaces.Profile}:discard_changes`)}
              className='wide'
              onClick={() => setFromLinkedInBlockActive(false)}
            />
          </div>
          {(user?.isAdminUser || adminData?.adminUser) && (
            <div className="mt-32">
              <Button
                className={styles.fetchButton}
                mode={Button.mode.Secondary}
                size={Button.size.SmallWide}
                text={t(`${Namespaces.Profile}:force_fetch`)}
                type="submit"
                onClick={async () => {
                  await router.push(`${CandidateProfileRoutes.Experience}?refetch=linkedin`);
                }}
              />
            </div>
          )}
        </WithLoader>
      </form>
    </div>
  );
};
