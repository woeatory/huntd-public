import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import buttons from '@/ui/buttons/buttons.module.scss';
import { Button } from '@/ui/buttons/Button';

interface Props {
  openModal: () => void;
}

export const ReviewCandidateProfileButton: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <Button
      mode={Button.mode.Primary}
      size={Button.size.Small}
      className={cn(buttons.primary, 'wide')}
      text={t(`${Namespaces.Profile}:preview_profile`)}
      onClick={props.openModal}
    />
  );
};
