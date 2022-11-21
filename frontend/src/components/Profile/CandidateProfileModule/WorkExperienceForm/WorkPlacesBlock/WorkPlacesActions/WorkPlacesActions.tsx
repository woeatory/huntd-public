import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import typography from '@/ui/typography/typography.module.scss';

interface Props {
  setFromLinkedInBlockActive: Dispatch<SetStateAction<boolean>>;
  setAddManuallyFormActive: Dispatch<SetStateAction<boolean>>;
}

export const WorkPlacesActions: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Profile]);

  const {
    setFromLinkedInBlockActive, setAddManuallyFormActive,
  } = props;

  return (
    <div className="cell large-3 large-offset-3">
      <p className={cn(typography.caption, 'mb-16')}>
        {t(`${Namespaces.Profile}:workplaces_job_experience`)}
      </p>
      <Button
        mode={Button.mode.Primary}
        className='mb-16 wide'
        text={t(`${Namespaces.Profile}:upload_from_linkedin`)}
        onClick={() => {
          setFromLinkedInBlockActive(true);
        }}
      />
      <Button
        mode={Button.mode.Secondary}
        text={t(`${Namespaces.Profile}:add_manually`)}
        className='mb-16 wide'
        onClick={() => setAddManuallyFormActive(true)}
      />
    </div>
  );
};
