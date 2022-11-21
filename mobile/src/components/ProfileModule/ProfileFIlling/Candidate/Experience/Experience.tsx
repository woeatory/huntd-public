import React, { FC, useCallback } from 'react';
import {
  ScrollView, StyleSheet, Text, View, Linking,
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Base/Button';
import { StepperComponentProps } from '@/components/Stepper/typedefs';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { FormField } from '@/components/FormElements/FormField';
import { TextArea } from '@/components/FormElements/FormInputs/TextArea';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { useUpdateCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useUpdateCandidateProfile';
import { useLogger } from '@/controllers/logger/logger.hooks/useLogger';
import { UpdateCandidateProfileMutationVariables } from '@/controllers/graphql/generated';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { AnalyticsClient } from '@/controllers/analytics/analytics.client';
import { AnalyticsEvents } from '@/controllers/analytics/analytics.events';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { goodProfileExamples } from '@/controllers/form/form.constants';
import { ArrowLeft } from '@/ui/icons/general/ArrowLeft';

type FormData = UpdateCandidateProfileMutationVariables;
type Props = StepperComponentProps;

export const Experience: FC<Props> = (props) => {
  const { next } = props;

  const logger = useLogger({ name: 'Experience' });

  const { t } = useTranslation([Namespaces.Profile, Namespaces.Form]);
  const {
    handleSubmit, control, errors, setError,
  } = useForm<FormData>();

  const [profile] = useLatestCandidateProfile();
  const [updateProfile] = useUpdateCandidateProfile();

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      const { experienceDescription, workExpectations, achievements } = data;

      await updateProfile({
        variables: {
          experienceDescription,
          workExpectations,
          achievements,
        },
      });

      next();

      AnalyticsClient.logEvent(
        AnalyticsEvents.userProfile.CandidateProfileFilled,
        { step: 'Experience' },
      );
    } catch (error) {
      processValidationErrors<
        UpdateCandidateProfileMutationVariables
        >(error, setError);

      logger.error(error, data);
    }
  }, [updateProfile, next, setError, logger]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'position' })}
        style={styles.container}
      >
        <View style={styles.hintsContainer}>
          <Text style={styles.hintsHeading}>
            {t(`${Namespaces.Form}:hints`)}
          </Text>
          <Text style={[styles.hintsMessage, { marginBottom: 8 }]}>
            {t(`${Namespaces.Form}:fill_profile_properly`)}
          </Text>
          <Text style={styles.hintsMessage}>
            {t(`${Namespaces.Form}:no_attention_to_templated_profiles`)}
          </Text>
          <Text style={styles.hintsHeading}>
            {t(`${Namespaces.Form}:good_profile_examples`)}
          </Text>
          <View style={styles.examplesContainer}>
            {goodProfileExamples.map((example) => (
              <TouchableWithoutFeedback
                key={example.title}
                onPress={() => Linking.openURL(example.link)}
              >
                <View style={styles.goodExampleLink}>
                  <Text style={styles.goodExampleText}>{example.title}</Text>
                  <ArrowLeft
                    style={{ transform: [{ rotate: '135deg' }] }}
                    color={Colors.Citrus}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        <FormField
          rules={{ required: true }}
          label={t(`${Namespaces.Form}:achievements_label`)}
          placeholder={t(`${Namespaces.Form}:achievements_placeholder`)}
          defaultValue={profile?.achievements || ''}
          control={control}
          error={errors.achievements}
          name="achievements"
          renderInput={(inputProps) => (
            <TextArea {...inputProps} height={120} />
          )}
        />

        <FormField
          rules={{ required: true }}
          label={t(`${Namespaces.Profile}:experience_label`)}
          placeholder={t(`${Namespaces.Form}:experience_description_placeholder`)}
          defaultValue={profile?.experienceDescription || ''}
          control={control}
          error={errors.experienceDescription}
          name="experienceDescription"
          renderInput={(inputProps) => (
            <TextArea {...inputProps} height={96} />
          )}
        />

        <FormField
          label={t(`${Namespaces.Form}:job_expectations_optional`)}
          placeholder={t(`${Namespaces.Form}:work_expectations_placeholder`)}
          defaultValue={profile?.workExpectations || ''}
          control={control}
          error={errors.workExpectations}
          name="workExpectations"
          renderInput={(inputProps) => (
            <TextArea {...inputProps} height={72} />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          title={t(`${Namespaces.Profile}:save-and-continue`)}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hintsContainer: {
    backgroundColor: Colors.LightPeach,
    padding: 16,
    marginBottom: 24,
    borderRadius: 4,

  },
  hintsHeading: {
    ...typography.caption,
    marginBottom: 12,
  },
  hintsMessage: {
    ...typography.text,
    marginBottom: 16,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goodExampleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 12,
  },
  goodExampleText: {
    ...typography.text,
    color: Colors.Citrus,
  },
});
