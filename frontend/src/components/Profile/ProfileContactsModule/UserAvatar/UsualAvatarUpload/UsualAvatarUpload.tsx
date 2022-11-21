import React, {
  FC, ChangeEvent, useCallback, useState,
} from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Image } from '@/components/Base/Image/Image';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useUploadAvatarMutation } from '@/controllers/graphql/generated';
import styles from './UsualAvatarUpload.module.scss';

const validateFile = (file: File) => file.size <= 1024 * 1024 * 8
  && ['image/x-png', 'image/png', 'image/jpeg'].includes(file.type);

export const UsualAvatarUpload: FC = () => {
  const [inputError, setInputError] = useState(false);
  const { t } = useTranslation([Namespaces.Form]);

  const [user] = useAuthUser();
  const [uploadAvatar] = useUploadAvatarMutation();

  const handleAvatarUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { validity, files } = event.target;

      setInputError(false);

      const file = files?.[0];
      const size = file?.size ?? 0;

      if (!file) {
        return;
      }

      if (validity.valid && validateFile(file)) {
        await uploadAvatar({
          variables: {
            file,
            size,
          },
        });

        analytics.sendEvent(
          analytics.events.pageInteraction.AvatarUploaded,
          {},
        );
      } else {
        setInputError(true);
      }
    },
    [uploadAvatar],
  );

  return (
    <div className={cn(styles.avatarBlock, 'mb-24')}>
      <label
        className={styles.avatarCircleWrapper}
        htmlFor="avatar"
      >
        {user?.avatar
          ? (
            <div className={styles.avatarPhotoCircle}>
              <Image
                src={user.avatar.url}
                width={240}
                height={240}
                objectFit="cover"
              />
            </div>
          )
          : (
            <div className={styles.avatarEmptyCircle} />
          )}
      </label>
      <div>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleAvatarUpload}
          hidden
        />
        <label
          htmlFor="avatar"
          className={styles.label}
        >
          {t(`${Namespaces.Form}:avatar_upload`)}
        </label>
        <div className={cn(styles.metaBlock, 'mt-8')}>
          {inputError && t(`${Namespaces.Validations}:avatar_max_size`)}
        </div>
      </div>
    </div>
  );
};
