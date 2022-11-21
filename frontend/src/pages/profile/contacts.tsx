import React from 'react';
import cn from 'classnames';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { ProfileContactsModule } from '@/components/Profile/ProfileContactsModule';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';

const ProfileContacts = () => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <div className="grid-container mt-80">
        <div className="grid-x grid-margin-x">
          <div className="cell large-6 large-offset-3">
            <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-8')}>
              {t(`${Namespaces.Profile}:profile_contacts_title`)}
            </h1>

            <p className={cn(typography.text, 'c-gray')}>
              {t(`${Namespaces.Profile}:profile_contacts_message`)}
            </p>
          </div>
        </div>

      </div>

      <ProfileContactsModule />
    </>
  );
};

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
  withAuthUserPage({ redirectUrl: `${Routes.Profile}/contacts` }),
)(ProfileContacts);
