import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PrimaryProfile, UpdateProfileContactsMutationVariables } from '@/controllers/graphql/generated';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Button } from '@/components/Base/Button';
import { useUpdateContacts } from '@/controllers/user/user.hooks/useUpdateContacts';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { SocialLinkPlaceholders, SOCIAL_LINKS_PATTERNS, SocialProviders } from '@/components/Contacts/Contacts.constants';
import { Colors } from '@/ui/theme/colors';
import { StackRoutes } from '@/controllers/router/router.constants';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks/useLatestRecruiterProfile';

type FormData = UpdateProfileContactsMutationVariables;

export const ContactsFields: FC = () => {
  const {
    handleSubmit, errors, control, setError,
  } = useForm<FormData>();

  const logger = useLogger({ name: 'Contacts fields' });
  const { t } = useTranslation([Namespaces.Form, Namespaces.Profile]);
  const navigation = useNavigation();

  const [user] = useAuthUser();
  const [updateContacts] = useUpdateContacts();

  const [candidate] = useLatestCandidateProfile();
  const [recruiter] = useLatestRecruiterProfile();

  const profile = useMemo(() => {
    switch (user?.primaryProfile) {
      case PrimaryProfile.Candidate:
        return candidate;

      case PrimaryProfile.Recruiter:
        return recruiter;

      default:
        return null;
    }
  }, [candidate, recruiter, user?.primaryProfile]);

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await updateContacts(data);

      if (profile?.slug) {
        navigation.navigate(
          user?.primaryProfile === PrimaryProfile.Candidate
            ? StackRoutes.Candidate
            : StackRoutes.Recruiter,
          { slug: profile?.slug },
        );
      } else {
        navigation.goBack();
      }
    } catch (error) {
      logger.error(error);

      processValidationErrors<
        UpdateProfileContactsMutationVariables
        >(error, setError);
    }
  }, [logger, navigation, profile, setError, updateContacts, user]);

  return (
    <View>
      <FormField
        rules={{ required: true }}
        control={control}
        name="firstName"
        label={t(`${Namespaces.Form}:first_name_label`)}
        defaultValue={user?.firstName || ''}
        error={errors.firstName}
        renderInput={(inputProps) => (
          <InputText {...inputProps} />
        )}
      />
      <FormField
        rules={{ required: true }}
        control={control}
        name="lastName"
        label={t(`${Namespaces.Form}:last_name_label`)}
        defaultValue={user?.lastName || ''}
        error={errors.lastName}
        renderInput={(inputProps) => (
          <InputText {...inputProps} />
        )}
      />

      <View style={styles.socialsContainer}>
        <FormField
          rules={{
            pattern: {
              value: SOCIAL_LINKS_PATTERNS[SocialProviders.Linkedin],
              message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                social: SocialProviders.Linkedin,
              }),
            },
          }}
          control={control}
          name="linkedinUrl"
          placeholder={SocialLinkPlaceholders.Linkedin}
          label={t(`${Namespaces.Form}:linkedin_url_label`)}
          defaultValue={user?.linkedinUrl || ''}
          error={errors.linkedinUrl}
          renderInput={(inputProps) => (
            <InputText {...inputProps} />
          )}
        />
        <FormField
          rules={{
            pattern: {
              value: SOCIAL_LINKS_PATTERNS[SocialProviders.Behance],
              message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                social: SocialProviders.Behance,
              }),
            },
          }}
          control={control}
          name="behanceUrl"
          placeholder={SocialLinkPlaceholders.Behance}
          label={t(`${Namespaces.Form}:behance_url_label`)}
          defaultValue={user?.behanceUrl || ''}
          error={errors.behanceUrl}
          renderInput={(inputProps) => (
            <InputText {...inputProps} />
          )}
        />
        <FormField
          rules={{
            pattern: {
              value: SOCIAL_LINKS_PATTERNS[SocialProviders.Github],
              message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                social: SocialProviders.Github,
              }),
            },
          }}
          control={control}
          name="githubUrl"
          placeholder={SocialLinkPlaceholders.Github}
          label={t(`${Namespaces.Form}:github_url_label`)}
          defaultValue={user?.githubUrl || ''}
          error={errors.githubUrl}
          renderInput={(inputProps) => (
            <InputText {...inputProps} />
          )}
        />
      </View>

      <Button
        type={Button.type.Primary}
        onPress={handleSubmit(onSubmit)}
        title={t(`${Namespaces.Profile}:update_contacts_action`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  socialsContainer: {
    borderTopColor: Colors.LightGray,
    borderTopWidth: 1,
    marginTop: 16,
    paddingVertical: 16,
  },
});
