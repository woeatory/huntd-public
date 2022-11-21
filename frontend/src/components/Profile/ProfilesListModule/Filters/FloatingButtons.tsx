import React, {
  FC, useState,
  DetailedHTMLProps, HTMLAttributes,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import typography from '@/ui/typography/typography.module.scss';
import { Routes } from '@/controllers/router/router.constants';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from '@/components/Profile/ProfilesListModule/Filters/FloatingButtons.module.scss';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { CreateSubscriptionButton } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CreateSubscriptionButton';

interface Options {
  selectedSubscription: SelectOption | null;
  disabled: boolean
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLDivElement
> & Options

export const FloatingButtons: FC<Props> = (props) => {
  const {
    selectedSubscription,
    disabled,
    className,
  } = props;

  const router = useRouter();
  const { t } = useTranslation([
    Namespaces.Form,
  ]);
  const { whereClause } = useQueryBuilder(router.query);

  const [
    isMessageVisible,
    setIsMessageVisible,
  ] = useState(false);

  const isButtonDisabled = disabled || !!selectedSubscription;

  const clearFilters = (async () => {
    await router.push(`${Routes.Candidates}`);
  });

  const showSubscribeMessage = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  if (!Object.keys(whereClause).length) {
    return null;
  }

  return (
    <div className={cn(className, styles.floatingContainer)}>
      {!selectedSubscription
        && Object.keys(whereClause).length > 0
        && (
          <CreateSubscriptionButton
            withLabel={false}
            buttonText={t(`${Namespaces.Form}:save_and_subscribe`)}
            buttonClassName="mb-16 wide"
            callback={showSubscribeMessage}
            disabled={isButtonDisabled}
          />
        )}

      {isMessageVisible && (
      <p className={cn(typography.overhead, styles.savedMessage, 'mb-16')}>
        <IconCheck />
        {t(`${Namespaces.Form}:saved_and_subscribed`)}
      </p>
      )}

      {Object.keys(whereClause).length > 0
        && (
          <Button
            type="button"
            mode={Button.mode.Secondary}
            className={cn('wide', styles.clearButton)}
            onClick={clearFilters}
            text={t(`${Namespaces.Form}:clear_filters_button`)}
          />
        )}
    </div>
  );
};
