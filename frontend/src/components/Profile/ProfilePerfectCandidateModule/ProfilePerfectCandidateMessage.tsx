import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import {
  FlashMessageType,
  useBulkSendMessageMutation,
  useCandidateProfilesBySubscriptionQuery,
  UsersSearchSubscription,
} from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { FormField } from '@/components/FormElements/FormField';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { InputTextAreaUi } from '@/components/FormElements/FormInputs/InputTextArea';
import { UseCreateMessageTemplate } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useCreateMessageTemplate';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Button } from '@/ui/buttons/Button';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Routes } from '@/controllers/router/router.constants';
import { Loader } from '@/ui/Loader';
import { TemplatesInputTitle } from '../ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/TemplatesInputTitle/TemplatesInputTitle';
import { TemplatesCheckbox } from '../ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/TemplatesCheckbox/TemplatesCheckbox';
import styles from './ProfilePerfectCandidateModule.module.scss';

interface Props {
  subscription: UsersSearchSubscription
}

interface FormData {
  messageBody: string;
  messageTitle: string;
  shouldCreateTemplate: boolean;
}

export const ProfilePerfectCandidateMessage: FC<Props> = React.memo(
  ({ subscription }) => {
    const { t } = useTranslation([
      Namespaces.Validations,
      Namespaces.PerfectCandidate,
    ]);

    const { subscriptionUrl } = subscription;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename: _, ...where } = subscription.searchParams;

    const [recruiter] = useLatestRecruiterProfile();
    const router = useRouter();

    const {
      data: candidatesData,
      loading: candidatesLoading,
    } = useCandidateProfilesBySubscriptionQuery({
      variables: {
        subscriptionLastInteract: new Date(0).toISOString(),
        where,
      },
    });

    const candidatesAmount = (
      candidatesData?.candidateProfilesBySubscription?.length ?? 0
    );

    const candidateIds = candidatesData?.candidateProfilesBySubscription?.map(
      (candidate) => candidate.id,
    );

    const flashMessage = useFlashMessage();

    const [
      bulkSendMessage,
      {
        loading: bulkSendMessageLoading,
      },
    ] = useBulkSendMessageMutation();

    const formMethods = useForm<FormData>({
      mode: 'onSubmit',
    });

    const {
      handleSubmit, register,
      watch, errors, setError,
    } = formMethods;

    const shouldCreateTemplateFormValue = watch('shouldCreateTemplate');

    const loading = candidatesLoading || bulkSendMessageLoading;

    const disabled = candidatesLoading
      || bulkSendMessageLoading
      || candidatesAmount === 0;

    const viewSubscription = useCallback(
      () => {
        analytics.sendEvent(
          analytics.events.subscriptions.SubscriptionUsed,
          {
            type: 'perfect_candidate',
          },
        );

        router.push(subscriptionUrl);
      },
      [router, subscriptionUrl],
    );

    const [createTemplate] = UseCreateMessageTemplate();

    const handleSendRequest = handleSubmit(async (data) => {
      const { messageBody, messageTitle, shouldCreateTemplate } = data;

      if (!candidateIds?.length || !recruiter) {
        return;
      }

      if (!messageBody || !messageBody.trim()) {
        setError('messageBody', {
          message: t(`${Namespaces.Validations}:connection_message_required`),
          type: 'authentication',
        });

        return;
      }

      try {
        await bulkSendMessage({
          variables: {
            recruiterProfileId: recruiter.id,
            candidateProfileIds: candidateIds,
            message: messageBody,
          },
        });

        if (shouldCreateTemplate && messageTitle && messageTitle.trim()) {
          await createTemplate(messageTitle, messageBody);

          analytics.sendEvent(
            analytics.events.templates.TemplateCreated,
            {},
          );
        }

        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Success,
            heading: t(`${Namespaces.PerfectCandidate}:succesfully_connected_title`),
            text: t(`${Namespaces.PerfectCandidate}:succesfully_connected_description`, { count: candidatesAmount }),
          },
        });

        analytics.sendEvent(
          analytics.events.chatInteraction.BulkMessagesSent,
          {
            candidatesAmount,
          },
        );

        await router.push(Routes.Chats);
      } catch {
        flashMessage.postMessage({
          variables: {
            type: FlashMessageType.Error,
            heading: t(`${Namespaces.PerfectCandidate}:error_connecting_candidates`),
            text: t(`${Namespaces.PerfectCandidate}:error_connecting_candidates_description`),
          },
        });
      }
    });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <>
        <Loader active={loading} />

        {candidatesAmount > 0
          ? (
            <>
              <h3 className={cn(typography.alertText, 'c-gray mb-40')}>
                {t(`${Namespaces.PerfectCandidate}:profile_perfect_candidate_subtitle_subs`, { count: candidatesAmount })}
              </h3>

              <form
                className={styles.form}
                onSubmit={handleSendRequest}
              >
                <div className={cn(styles.messageWrapper, 'mb-24')}>
                  <FormField
                    disabled={loading || disabled}
                    error={errors.messageBody}
                    renderInput={(options) => (
                      <InputTextAreaUi
                        {...options}
                        id='messageBody'
                        placeholder={t(`${Namespaces.PerfectCandidate}:template_message_placeholder`)}
                        className={cn(FormInputs.textarea)}
                        name='messageBody'
                        rows={9}
                        ref={register}
                      />
                    )}
                  />
                </div>

                <div className="grid-x mb-8">
                  <TemplatesCheckbox
                    className="cell small-6 mb-8"
                    formDisabled={loading || disabled}
                    {...formMethods}
                  />

                  <TemplatesInputTitle
                    className={cn('cell medium-7')}
                    formDisabled={loading || disabled}
                    shouldCreateTemplate={shouldCreateTemplateFormValue}
                    {...formMethods}
                  />
                </div>

                <div className={styles.buttonsContainer}>

                  <Button
                    type='submit'
                    disabled={loading || disabled}
                    className={styles.button}
                    mode={Button.mode.Primary}
                    text={t(`${Namespaces.PerfectCandidate}:send-message-button`)}
                  />

                  <Button
                    className={styles.button}
                    onClick={viewSubscription}
                    mode={Button.mode.BorderLess}
                    text={t(`${Namespaces.PerfectCandidate}:manually_connect_candidates`, { count: candidatesAmount })}
                  />
                </div>
              </form>
            </>
          )
          : (
            <>
              <h3 className={cn('mb-24 c-gray', typography.alertText)}>
                {t(`${Namespaces.PerfectCandidate}:zero_candidates_title`)}
              </h3>

              <Button
                className={styles.button}
                mode={Button.mode.Primary}
                href={Routes.Candidates}
                text={t(`${Namespaces.PerfectCandidate}:zero_candidates_button`)}
              />
            </>
          )}

      </>
    );
  },
);
