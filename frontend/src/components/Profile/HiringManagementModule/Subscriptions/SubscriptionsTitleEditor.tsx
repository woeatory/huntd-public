import React, {
  useState, Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import cn from 'classnames';
import styles from '@/components/Profile/HiringManagementModule/Subscriptions/SubscriptionsTitleEditor.module.scss';
import { useUpdateSubscriptionTitleMutation } from '@/controllers/graphql/generated';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { InputTextUi } from '@/components/FormElements/FormInputs/InputText';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { Button } from '@/ui/buttons/Button';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { IconClose } from '@/ui/icons/general/IconClose';

interface Props {
  setIsEditing: Dispatch<SetStateAction<boolean>>
  selectedSubscription: SelectOption | null
}

export const SubscriptionsTitleEditor = ({
  setIsEditing, selectedSubscription,
}: Props) => {
  const [title, setTitle] = useState(selectedSubscription?.label);
  const [user] = useAuthUser();
  const { t } = useTranslation([Namespaces.Common]);
  const userId = user?.id ?? null;

  const [
    updateTitle,
    { loading: renameInProgress },
  ] = useUpdateSubscriptionTitleMutation();

  const renameSubscription = useCallback(
    async () => {
      if (selectedSubscription && title && userId) {
        await updateTitle({
          variables: {
            id: +selectedSubscription.value,
            values: {
              title,
            },
            userId,
          },
        });
      }

      if (!title && selectedSubscription) {
        setTitle(selectedSubscription.label);
      }

      setIsEditing(false);
    },
    [
      selectedSubscription, title,
      updateTitle, userId, setIsEditing,
    ],
  );

  const closeEditor = useCallback(() => {
    setIsEditing(false);

    if (selectedSubscription) {
      setTitle(selectedSubscription.label);
    }
  }, [selectedSubscription, setIsEditing]);

  return (
    <>
      <InputTextUi
        autoFocus
        className='mb-12'
        onChange={({ target }) => setTitle(target.value)}
        value={title}
        name="subscription_title"
      />

      <div className={styles.editingContainer}>
        <Button
          className={cn(styles.saveTitleButton)}
          disabled={renameInProgress}
          type="button"
          onClick={renameSubscription}
          text={t(`${Namespaces.Common}:save_subscription_title`)}
        />

        <button
          type="button"
          className={styles.closeButton}
          onClick={closeEditor}
        >
          <IconClose />
        </button>
      </div>
    </>
  );
};
