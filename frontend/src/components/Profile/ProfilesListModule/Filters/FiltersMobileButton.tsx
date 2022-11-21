import React from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import styles from '@/components/Profile/ProfilesListModule/Filters/Filters.module.scss';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import { IconFiltersMobile } from '@/ui/icons/general/IconFiltersMobile';

interface Props {
  clickHandler: () => void
  isOpened: boolean
}

export const FiltersMobileButton = (props: Props) => {
  const { clickHandler, isOpened } = props;
  const { t } = useTranslation([Namespaces.Form]);

  return (
    <>
      <Button
        mode={Button.mode.Secondary}
        type="button"
        className={styles.filtersTabletButton}
        onClick={clickHandler}
        text={t(`${Namespaces.Form}:filters`)}
        RightIcon={isOpened ? IconMinus : IconPlus}
      />

      <Button
        mode={Button.mode.IconOnly}
        type="button"
        className={styles.filtersMobileButton}
        onClick={clickHandler}
        LeftIcon={IconFiltersMobile}
      />
    </>
  );
};
