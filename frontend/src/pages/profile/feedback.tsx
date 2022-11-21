import React from 'react';
import cn from 'classnames';
import styles from '@/components/Profile/CandidateProfileModule/SignUpFeedbackForm/SignUpFeedbackForm.module.scss';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';
import { SignUpFeedbackForm } from '@/components/Profile/CandidateProfileModule/SignUpFeedbackForm';

const ProfileSignUpFeedback = React.memo(() => {
  const { t } = useTranslation([Namespaces.ProfileFeedback]);

  return (
    <>
      <div className={cn(styles.mainContainer, 'grid-container mt-80')}>
        <div className="grid-x grid-margin-x">
          <div className='cell large-5 large-offset-3 mb-32'>
            <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate')}>
              {t(`${Namespaces.ProfileFeedback}:profile_feedback_title`)}
            </h1>
          </div>

          <SignUpFeedbackForm />
        </div>
      </div>
    </>
  );
});

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces([
    Namespaces.Common,
    Namespaces.ProfileFeedback,
  ]),
  withAuthUserPage({ redirectUrl: `${Routes.Profile}/contacts` }),
)(ProfileSignUpFeedback);
