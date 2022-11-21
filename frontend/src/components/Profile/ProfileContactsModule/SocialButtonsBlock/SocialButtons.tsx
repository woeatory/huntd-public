import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import { OAuthProviders, OAuthToken } from '@/controllers/graphql/generated';
import { useUsersOAuthProviders } from '@/controllers/oauth/oauth.hooks/useUsersOAuthProviders';
import { ConnectProviderButton } from '@/components/Profile/ProfileContactsModule/SocialButtonsBlock/ConnectProviderButton';
import { DisconnectProviderButton } from '@/components/Profile/ProfileContactsModule/SocialButtonsBlock/DisconnectProviderButton';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { FCIcon } from '@/ui/icons/typedefs';
import styles from './SocialButtons.module.scss';

interface Providers {
  name: OAuthProviders;
  icon: FCIcon;
}

const providers: Providers[] = [
  {
    name: OAuthProviders.Linkedin,
    icon: IconLinkedin,
  },
  {
    name: OAuthProviders.Github,
    icon: IconGithub,
  },
  {
    name: OAuthProviders.Google,
    icon: IconGoogle,
  },
];

export const SocialButtons = () => {
  const [loading, setLoading] = useState(false);
  const [
    usersOAuthProviders, { refetch: refetchProviders },
  ] = useUsersOAuthProviders();

  const userProvidersMap = useMemo(() => {
    if (usersOAuthProviders) {
      return usersOAuthProviders
        .reduce<Record<string, OAuthToken>>(
          (acc, cur) => {
            Object.assign(acc, { [cur.providerName]: cur });

            return acc;
          },
          {},
        );
    }

    return {};
  }, [usersOAuthProviders]);

  return (
    <div className={cn(styles.wrapper, 'cell large-6 large-offset-3 mb-40')}>
      {providers.map((provider) => {
        if (userProvidersMap[provider.name]) {
          return (
            <DisconnectProviderButton
              key={provider.name}
              provider={provider.name}
              loading={loading}
              setLoading={setLoading}
              refetchProviders={refetchProviders}
              ProviderIcon={provider.icon}
            />
          );
        }

        return (
          <ConnectProviderButton
            key={provider.name}
            provider={provider.name}
            loading={loading}
            setLoading={setLoading}
            refetchProviders={refetchProviders}
            ProviderIcon={provider.icon}
          />
        );
      })}
    </div>
  );
};
