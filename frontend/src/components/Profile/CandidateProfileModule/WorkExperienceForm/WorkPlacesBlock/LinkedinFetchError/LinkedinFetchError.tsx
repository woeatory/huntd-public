import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';
import { IconClose } from '@/ui/icons/general/IconClose';
import styles from './LinkedinFetchError.module.scss';

interface Props {
  setIsNoExperienceFetched: Dispatch<SetStateAction<boolean>>;
  setAddManuallyFormActive: Dispatch<SetStateAction<boolean>>;
  setIsOneWorkPlaceMode: Dispatch<SetStateAction<boolean>>;
}

export const LinkedinFetchError: FC<Props> = (options) => {
  const {
    setIsNoExperienceFetched,
    setAddManuallyFormActive,
    setIsOneWorkPlaceMode,
  } = options;
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <div className="cell large-5 large-offset-3 mb-40">
        <div className={cn(styles.textContainer, 'mb-8')}>
          <div className={styles.iconCircleWrapper}>
            <IconClose />
          </div>
          <p className={cn(typography.caption, 'c-semidark-chocolate mb-8')}>
            {t(`${Namespaces.Profile}:add_just_one_latest_workplace`)}
          </p>
        </div>
        <p className={cn(typography.smallText, 'c-semidark-chocolate')}>
          {t(`${Namespaces.Profile}:linkedin_fetching_error_description`)}
        </p>
      </div>
      <div className="cell large-3 large-offset-3">
        <Button
          mode={Button.mode.Primary}
          className='mb-16 wide'
          text={t(`${Namespaces.Profile}:add_workplace`)}
          onClick={() => {
            setIsNoExperienceFetched(false);
            setAddManuallyFormActive(true);
            setIsOneWorkPlaceMode(true);
          }}
        />
      </div>
    </>
  );
};
