import React, { FC, ChangeEvent, useCallback } from 'react';
import cn from 'classnames';
import { useRemoveCvFileMutation, useUploadCvFileMutation } from '@/controllers/graphql/generated';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { UploadCV } from '@/components/Profile/ProfileContactsModule/CVInputBlock/UploadCV/UploadCV';
import { AttachedCV } from '@/components/Profile/ProfileContactsModule/CVInputBlock/AttachedCV/AttachedCV';
import { IconClose } from '@/ui/icons/general/IconClose';
import { analytics } from '@/controllers/analytics/analytics.client';
import styles from './CVInputBlock.module.scss';

export const CVInputBlock: FC = () => {
  const { t } = useTranslation([Namespaces.Validations]);
  const [user] = useAuthUser();
  const flashMessage = useFlashMessage();
  const [uploadCv] = useUploadCvFileMutation();
  const [removeCv] = useRemoveCvFileMutation();

  const handleCvUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { validity, files, size } = event.target;

      if (!validity.valid) {
        return;
      }

      if (!files) {
        await flashMessage.postMessage({
          variables: {
            type: flashMessage.messageTypes.Error,
            // TODO: add translates 'please attach a file'
            text: t(`${Namespaces.Validations}:cv_error`),
            heading: t(`${Namespaces.Validations}:validation_message_title`),
          },
        });
      }

      await uploadCv({
        variables: {
          file: files?.[0],
          size,
        },
      });

      analytics.sendEvent(
        analytics.events.pageInteraction.CvUploaded,
        {},
      );
    },
    [uploadCv, flashMessage, t],
  );

  const handleCvRemoval = async () => {
    await removeCv();
  };

  return (
    <div className="mb-24">
      <label
        htmlFor="cv"
        className={cn(styles.label, 'mb-4')}
      >
        {t(`${Namespaces.Form}:cv_label`)}
      </label>
      { user?.cv ? (
        <AttachedCV
          user={user}
          userCv={user.cv}
          removeCv={handleCvRemoval}
          className={styles.attachedCv}
          iconClassName={styles.closeButton}
          linkClassName={styles.cvLink}
        >
          <IconClose />
        </AttachedCV>
      ) : (
        <UploadCV uploadCV={handleCvUpload} />
      )}
    </div>
  );
};
