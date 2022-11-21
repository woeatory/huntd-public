import React, { Dispatch, memo, SetStateAction } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import styles from './ProfileEditModeActions.module.scss';

interface Props {
  onSubmit: () => Promise<void>;
  discardChanges: () => void;
  edited: boolean;
  setEdited: Dispatch<SetStateAction<boolean>>
}

export const ProfileEditModeActions = memo<Props>((props) => {
  const {
    edited, setEdited, onSubmit, discardChanges,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const handleSubmit = async () => {
    setEdited(false);
    await onSubmit();
  };

  const handleDiscard = () => {
    setEdited(false);
    discardChanges();
  };

  return edited ? (
    <div className={cn(styles.floatingContainer, 'cell large-5 large-offset-3')}>
      <Button
        type="submit"
        mode={Button.mode.Primary}
        className="wide"
        onClick={handleSubmit}
        text={t(`${Namespaces.Profile}:save_changes`)}
      />

      <Button
        type="button"
        mode={Button.mode.Secondary}
        className={cn('wide', styles.discardButton)}
        onClick={handleDiscard}
        text={t(`${Namespaces.Profile}:discard_changes`)}
      />
    </div>
  )
    : null;
});
