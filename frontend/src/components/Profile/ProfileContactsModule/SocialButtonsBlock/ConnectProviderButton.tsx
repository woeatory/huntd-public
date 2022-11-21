import React, {
  useCallback, FC, Dispatch, SetStateAction,
} from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { useConnectOAuthProvider } from '@/controllers/oauth/oauth.hooks/useConnectOAuthProvider';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import { FCIcon } from '@/ui/icons/typedefs';
import styles from './SocialButtons.module.scss';

interface Props {
  provider: OAuthProviders;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetchProviders: any;
  ProviderIcon: FCIcon;
}
export const ConnectProviderButton: FC<Props> = React.memo<Props>(({
  provider, loading, setLoading, refetchProviders, ProviderIcon,
}) => {
  const connectProvider = useConnectOAuthProvider(provider);
  const { t } = useTranslation([Namespaces.Auth]);

  const sendAnalytics = useCallback(
    () => {
      analytics.sendEvent(
        analytics.events.userProfile.ConnectSocialProviderClick,
        { provider },
      );
    },
    [provider],
  );

  const connectProviderHandler = useCallback(async () => {
    setLoading(true);

    await connectProvider();

    await refetchProviders();
    setLoading(false);
    sendAnalytics();
  }, [setLoading, connectProvider, refetchProviders, sendAnalytics]);

  return (
    <Button
      mode={Button.mode.Secondary}
      type="button"
      className={cn(styles.socialButton, 'wide')}
      onClick={connectProviderHandler}
      disabled={loading}
      text={`${t(`${Namespaces.Profile}:connect_provider`)} ${provider}`}
      LeftIcon={ProviderIcon}
    />
  );
});
