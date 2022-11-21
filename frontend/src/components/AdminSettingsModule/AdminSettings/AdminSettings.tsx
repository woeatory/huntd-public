import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import typography from '@/ui/typography/typography.module.scss';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import { Button } from '@/ui/buttons/Button';
import { useUpdateAdminSettings } from '@/controllers/user/user.hooks/useUpdateAdminSettings';
import { useAdminSettings } from '@/controllers/user/user.hooks/useAdminSettings';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { UserGeneratorForm } from '@/components/AdminSettingsModule/UserGeneratorForm/UserGeneratorForm';
import styles from './AdminSettings.module.scss';

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

interface Props {
  closeSidebar: Dispatch<SetStateAction<boolean>>;
  isOpened: boolean;
}

interface FormData {
  contactsVisibilityPermission: boolean;
  silentProfileUpdate: boolean;
}

export const AdminSettings: FC<Props> = (props) => {
  const { isOpened, closeSidebar } = props;

  const { t } = useTranslation([
    Namespaces.Common,
    Namespaces.Profile,
  ]);

  const router = useRouter();

  const [user] = useAuthUser();

  const [adminSettings] = useAdminSettings();

  const [updateAdminSettings] = useUpdateAdminSettings();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  const formMethods = useForm<FormData>({
    mode: 'onBlur',
  });

  const { handleSubmit, register } = formMethods;

  const updateSettings = handleSubmit(async (data) => {
    const { contactsVisibilityPermission, silentProfileUpdate } = data;

    await updateAdminSettings({
      permissions: {
        contactsVisibilityPermission,
        silentProfileUpdate,
      },
    });

    router.reload();
  });

  return user?.isAdminUser ? (
    <div className={styles.settingsWrapper}>
      <h2 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-24')}>
        {t(`${Namespaces.Common}:admin_settings`)}
      </h2>

      <p className={cn(typography.text, 'c-gray mb-24')}>
        {t(`${Namespaces.Common}:admin_settings_permissions`)}
      </p>

      <form>
        <div className={cn(styles.formWrapper, {
          [styles.sidebarFilters]: isOpened,
        })}
        >
          <div className="mb-24">
            <InputCheckboxUi
              label={t(`${Namespaces.Common}:contact_visibility_permission`)}
              name="contactsVisibilityPermission"
              ref={register}
              defaultChecked={adminSettings?.contactsVisibilityPermission}
            />
          </div>

          <div className="mb-24">
            <InputCheckboxUi
              label={t(`${Namespaces.Common}:silent_profile_update`)}
              name="silentProfileUpdate"
              ref={register}
              defaultChecked={adminSettings?.silentProfileUpdate}
            />
          </div>

          <div className="mb-48">
            <Button
              mode={Button.mode.Secondary}
              size={Button.size.Small}
              type="button"
              onClick={() => {
                closeSidebar(false);
                openModal();
              }}
              text={t(`${Namespaces.Profile}:pre_create_subscription`)}
            />
          </div>

          <div className="cell large-4 large-offset-3">
            <Button
              mode={Button.mode.Primary}
              type="button"
              onClick={() => updateSettings()}
              text={t(`${Namespaces.Profile}:save_changes`)}
            />
          </div>
        </div>
      </form>

      <Modal
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <UserGeneratorForm closeModal={closeModal} />
      </Modal>
    </div>
  ) : null;
};
