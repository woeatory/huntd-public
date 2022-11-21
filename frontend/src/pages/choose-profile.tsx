import React from 'react';
import cn from 'classnames';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { ProfileSelectorModule } from '@/components/Profile/ProfileSelectorModule';
import { withNoJoinCodePage } from '@/controllers/page/page.quards/withNoJoinCodePage';

const ChooseProfile = () => {
  const { t } = useTranslation([Namespaces.ChooseProfile]);

  return (
    <>
      <div className="grid-container mt-80">
        <div className="grid-x grid-margin-x">
          <div className="cell large-6 large-offset-4">
            <h1 className={cn(typography.h1, 'mb-8')}>
              {t(`${Namespaces.ChooseProfile}:priority_role_title`)}
            </h1>

            <p className={cn(typography.text, 'c-gray mb-40')}>
              {t(`${Namespaces.ChooseProfile}:priority_role_message`)}
            </p>
          </div>
        </div>
      </div>

      <ProfileSelectorModule />

    </>

  );
};

export default compose(
  withApolloSSR,
  withNamespaces(ProfileNamespaces),
  withAuthUserPage(),
  withNoJoinCodePage,
)(ChooseProfile);
