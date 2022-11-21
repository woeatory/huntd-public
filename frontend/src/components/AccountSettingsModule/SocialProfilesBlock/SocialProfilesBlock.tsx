import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { OAuthProviders, OAuthToken } from '@/controllers/graphql/generated';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { FCIcon } from '@/ui/icons/typedefs';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { SocialProfile } from '@/components/AccountSettingsModule/SocialProfilesBlock/SocialProfile';
import { useUsersOAuthProviders } from '@/controllers/oauth/oauth.hooks/useUsersOAuthProviders';

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

export const SocialProfilesBlock = () => {
  const { t } = useTranslation([Namespaces.Profile]);

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
    <>
      <div className="grid-container mt-40">
        <div className="grid-x grid-margin-x">
          <div className="cell large-6 large-offset-3">
            <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-8')}>
              {t(`${Namespaces.Profile}:social_profiles`)}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid-container mb-24">
        <div className="grid-x grid-margin-x">
          <div className="cell large-offset-3 large-6">
            <div className="mb-16">
              <p className={cn(typography.text, 'c-gray')}>
                {t(`${Namespaces.Profile}:connect_social_profiles`)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          {providers.map((provider) => (
            <SocialProfile
              key={provider.name}
              provider={provider.name}
              ProviderIcon={provider.icon}
              loading={loading}
              setLoading={setLoading}
              refetchProviders={refetchProviders}
              isConnected={!!userProvidersMap[provider.name]}
            />
          ))}
        </div>
      </div>
    </>
  );
};
