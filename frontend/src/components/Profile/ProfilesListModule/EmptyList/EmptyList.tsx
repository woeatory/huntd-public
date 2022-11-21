import React, {
  DetailedHTMLProps, FC, HTMLAttributes, useState,
} from 'react';
import cn from 'classnames';
import styles from '@/components/Profile/ProfilesListModule/EmptyList/EmptyList.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { CreateSubscriptionButton } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CreateSubscriptionButton';

interface Options {
  loading: boolean
  selectedSubscription: SelectOption | null;
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & Options

export const EmptyList: FC<Props> = (options) => {
  const { t } = useTranslation([
    Namespaces.Profile, Namespaces.Form,
  ]);
  const { className, loading, selectedSubscription } = options;
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const showSubscribeMessage = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 3000);
  };

  return (
    <>
      <div className={cn(className, styles.wrapper)}>
        <div className={styles.text}>
          {t(`${Namespaces.Profile}:empty_candidates_list`)}
        </div>
        <div className={styles.magnifier} />
      </div>
      {!loading && !selectedSubscription && (
        <CreateSubscriptionButton
          className={styles.subscriptionsActions}
          buttonText={t(`${Namespaces.Common}:notify_me`)}
          labelText={t(`${Namespaces.Common}:notify_me_text`)}
          buttonClassName={styles.notifyButton}
          labelClassName={styles.subscriptionsText}
          callback={showSubscribeMessage}
          withLabel
        />
      )}
      {isMessageVisible && (
        <p className={cn(typography.overhead, styles.savedText, 'mb-16')}>
          <IconCheck />
          {t(`${Namespaces.Form}:saved_and_subscribed`)}
        </p>
      )}
      {!loading && selectedSubscription && (
        <p className={styles.subscriptionsText}>
          {t(`${Namespaces.Common}:we_will_notify_you`)}
        </p>
      )}
    </>
  );
};
