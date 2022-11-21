import React, {
  useCallback, FC, Dispatch, SetStateAction,
} from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { OAuthProviders, useDisconnectOAuthProviderMutation } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { FCIcon } from '@/ui/icons/typedefs';
import styles from './SocialButtons.module.scss';

interface Props {
  provider: OAuthProviders;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetchProviders: any;
  ProviderIcon: FCIcon;
}
export const DisconnectProviderButton: FC<Props> = React.memo<Props>(({
  provider, loading, setLoading, refetchProviders, ProviderIcon,
}) => {
  const [disconnectProvider] = useDisconnectOAuthProviderMutation();
  const { t } = useTranslation([Namespaces.Auth]);

  const connectProviderHandler = useCallback(async () => {
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
    <Button
      mode={Button.mode.Secondary}
      type="button"
      className={cn(styles.socialButton, 'wide')}
      onClick={connectProviderHandler}
      disabled={loading}
      text={`${t(`${Namespaces.Profile}:disconnect_provider`)} ${provider}`}
      LeftIcon={ProviderIcon}
    />
  );
});
