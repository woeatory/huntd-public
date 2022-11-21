import React, {
  FC, Dispatch, SetStateAction, useCallback,
} from 'react';
import cn from 'classnames';
import { OAuthProviders, useDisconnectOAuthProviderMutation } from '@/controllers/graphql/generated';
import { FCIcon } from '@/ui/icons/typedefs';
import { Button } from '@/ui/buttons/Button';
import { useConnectOAuthProvider } from '@/controllers/oauth/oauth.hooks/useConnectOAuthProvider';
import { analytics } from '@/controllers/analytics/analytics.client';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import styles from './SocialProfileBlock.module.scss';

interface Props {
  provider: OAuthProviders;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetchProviders: any;
  ProviderIcon: FCIcon;
  isConnected: boolean;
}

export const SocialProfile:FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Profile]);

  const {
    ProviderIcon, provider, isConnected, loading, setLoading, refetchProviders,
  } = props;
  const connectProvider = useConnectOAuthProvider(provider);
  const [disconnectProvider] = useDisconnectOAuthProviderMutation();

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

  const disconnectProviderHandler = useCallback(async () => {
    setLoading(true);

    await disconnectProvider({
      variables: {
        provider,
      },
    });

    await refetchProviders();
    setLoading(false);
  }, [refetchProviders, disconnectProvider, setLoading, provider]);

  return (
    <div className={cn(styles.socialProfile, 'cell large-6 large-offset-3')}>
      <div className="grid-container full">
        <div className="grid-x grid-margin-x">
          <div className={cn(styles.socialProfileTitle, 'cell large-5')}>
            <div className={styles.socialProfileIcon}>
              <ProviderIcon />
            </div>
            <div>
              <p className={cn(styles.socialProfileName, 'mb-4')}>
                {provider}
              </p>
              <p className={styles.socialProfileLabel}>
                {t(`${Namespaces.Profile}:sign_in_with_provider`, { provider })}
              </p>
            </div>
          </div>

          <div className="cell large-4 large-offset-3">
            {isConnected
              ? (
                <Button
                  mode={Button.mode.Transparent}
                  size={Button.size.LargeWide}
                  text={t(`${Namespaces.Profile}:disconnect_action`)}
                  className={cn(styles.disconnectButton, 'wide')}
                  onClick={disconnectProviderHandler}
                  disabled={loading}
                />
              )
              : (
                <Button
                  mode={Button.mode.Primary}
                  size={Button.size.LargeWide}
                  text={t(`${Namespaces.Profile}:connect_action`)}
                  className="wide"
                  onClick={connectProviderHandler}
                  disabled={loading}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
