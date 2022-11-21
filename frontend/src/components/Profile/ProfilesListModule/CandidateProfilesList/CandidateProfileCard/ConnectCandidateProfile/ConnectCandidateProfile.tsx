import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { CandidateProfile } from '@/controllers/graphql/generated';
import {
  ConnectionRequestStatus,
  useSendConnectionRequestWithMessage,
} from '@/controllers/candidateProfile/candidateProfile.hooks/useSendConnectionRequestWithMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ConnectButton } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectButton';
import typography from '@/ui/typography/typography.module.scss';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { FormField } from '@/components/FormElements/FormField';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { UseRecruiterMessageTemplates } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useRecruiterMessageTemplates';
import { UseCreateMessageTemplate } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useCreateMessageTemplate';
import { TemplatesSelect } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/TemplatesSelect/TemplatesSelect';
import { TemplatesInputTitle } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/TemplatesInputTitle/TemplatesInputTitle';
import { useSendAnalytics } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/sendAnalytics';
import { InputTextAreaUi } from '@/components/FormElements/FormInputs/InputTextArea';
import { analytics } from '@/controllers/analytics/analytics.client';
import { SubscriptionCheckbox } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/SubscriptionCheckbox/SubscriptionCheckbox';
import { useAutoSubscription } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useAutoSubscription';
import styles from './ConnectCandidateProfile.module.scss';
import { TemplatesCheckbox } from './TemplatesCheckbox/TemplatesCheckbox';

interface Props {
  recruiterProfileId: number;
  candidateProfileId: number;
  candidateProfile: CandidateProfile;
  closeModal: () => void;
}

interface FormData {
  messageBody: string;
  messageTitle: string;
  shouldCreateTemplate: boolean;
  shouldCreateSubscription: boolean;
}

export const ConnectCandidateProfile = React.memo<Props>(
  (props) => {
    const {
      candidateProfileId,
      recruiterProfileId,
      candidateProfile,
      closeModal,
    } = props;

    const { t } = useTranslation([Namespaces.Chat]);

    const formMethods = useForm<FormData>({
      mode: 'onSubmit',
    });

    const {
      handleSubmit, register,
      watch, errors, setError,
    } = formMethods;

    const shouldCreateTemplateFormValue = watch('shouldCreateTemplate');

    const sendAnalytics = useSendAnalytics(candidateProfile);

    const [isConnectionSent, setConnectionSent] = useState(false);

    const [template, setTemplate] = useState<SelectOption>({ label: '', value: '' });

    const {
      sendConnectionRequestWithMessage, loading,
    } = useSendConnectionRequestWithMessage();

    const userMessageTemplates = UseRecruiterMessageTemplates();

    const [createTemplate] = UseCreateMessageTemplate();

    const {
      subscribe,
      isSubscriptionExist,
      hasSearchFilters,
    } = useAutoSubscription();

    const onConnectionSuccess = useCallback(
      async () => {
        setConnectionSent(true);
        sendAnalytics();
        closeModal();
      }, [closeModal, sendAnalytics],
    );

    const handleSendRequest = handleSubmit(async (data) => {
      const {
        messageBody,
        messageTitle,
        shouldCreateTemplate,
        shouldCreateSubscription,
      } = data;

      if (!messageBody || !messageBody.trim()) {
        setError('messageBody', {
          message: t(`${Namespaces.Validations}:connection_message_required`),
          type: 'authentication',
        });

        return;
      }

      const connectionRequestResponse = await sendConnectionRequestWithMessage(
        {
          recruiterProfileId,
          candidateProfileId,
          connectMessage: messageBody,
        },
      );

      if (connectionRequestResponse === ConnectionRequestStatus.Success) {
        if (shouldCreateTemplate && messageTitle && messageBody) {
          await createTemplate(messageTitle, messageBody);

          analytics.sendEvent(
            analytics.events.templates.TemplateCreated,
            {},
          );
        }

        if (
          shouldCreateSubscription
          && hasSearchFilters
          && !isSubscriptionExist
        ) {
          await subscribe();
        }

        await onConnectionSuccess();
      }
    });

    return (
      <form
        className={styles.form}
        onSubmit={handleSendRequest}
      >
        <div className={styles.titleWrapper}>
          <h3 className={cn(typography.accentTitle, 'mb-16')}>
            {t(`${Namespaces.Chat}:send_connection_request`)}
          </h3>
        </div>
        <div className={cn(styles.messageWrapper, 'mb-24')}>
          <div className={styles.messageHeaderWrapper}>
            <p className={cn(styles.messageLabel, 'mb-8')}>
              {t(`${Namespaces.Common}:template_message_title`)}
            </p>
            {userMessageTemplates.length > 0 && (
              <TemplatesSelect
                className={styles.templatesSelect}
                userMessageTemplates={userMessageTemplates}
                setTemplate={setTemplate}
              />
            )}
          </div>
          <FormField
            disabled={loading}
            error={errors.messageBody}
            renderInput={(options) => (
              <InputTextAreaUi
                {...options}
                placeholder={t(`${Namespaces.Common}:template_message_placeholder`)}
                className={cn(FormInputs.textarea)}
                name='messageBody'
                rows={9}
                ref={register}
                defaultValue={template.value}
              />
            )}
          />
        </div>

        <div className="grid-x mb-8">
          <TemplatesCheckbox
            className="cell small-6 mb-8"
            formDisabled={false}
            {...formMethods}
          />

          <TemplatesInputTitle
            className={cn('cell medium-7')}
            formDisabled={false}
            shouldCreateTemplate={shouldCreateTemplateFormValue}
            {...formMethods}
          />
        </div>

        {(hasSearchFilters && !isSubscriptionExist) && (
          <div className="grid-x mb-8">
            <SubscriptionCheckbox
              className="cell small-8 mb-8"
              formDisabled={false}
              {...formMethods}
            />
          </div>
        )}

        <ConnectButton
          className={styles.connectButton}
          loading={loading}
          completed={isConnectionSent}
        />
      </form>
    );
  },
);
