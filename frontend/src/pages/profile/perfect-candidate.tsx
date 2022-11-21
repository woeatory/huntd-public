import React, { useMemo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { ProfileLayout } from '@/components/Base/Layout/ProfileLayout';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ProfileNamespaces } from '@/controllers/profile/profile.constants';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { Routes } from '@/controllers/router/router.constants';
import { ProfilePerfectCandidateForm } from '@/components/Profile/ProfilePerfectCandidateModule/ProfilePerfectCandidateForm';
import { withNoSubscriptionsPage } from '@/controllers/page/page.quards/withNoSubscriptions';
import { ProfilePerfectCandidateMessage } from '@/components/Profile/ProfilePerfectCandidateModule/ProfilePerfectCandidateMessage';
import { useUserSubscriptionsQuery } from '@/controllers/graphql/generated';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

const PerfectCandidateQuiz = React.memo(() => {
  const { query } = useRouter();
  const [user] = useAuthUser();

  const { data } = useUserSubscriptionsQuery();

  const isUsedByAdmin = query.username && user?.isAdminUser;

  const subscription = useMemo(
    () => {
      if (data?.authUser?.searchSubscriptions) {
        return data.authUser.searchSubscriptions[0];
      }

      return null;
    }, [data],
  );

  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <div className="grid-container mt-80">
        <div className="grid-x grid-margin-x">
          <div className="cell medium-8 large-6 medium-offset-2 large-offset-3">
            <h1 className={cn(typography.smallHeading, 'c-semidark-chocolate mb-8')}>
              {subscription
                ? t(`${Namespaces.PerfectCandidate}:profile_perfect_candidate_title_subs`)
                : t(`${Namespaces.PerfectCandidate}:profile_perfect_candidate_title`)}
            </h1>

            {!subscription && (
              <p className={cn(typography.text, 'c-gray mb-40')}>
                {t(`${Namespaces.PerfectCandidate}:profile_perfect_candidate_subtitle`)}
              </p>
            )}
          </div>

          <div className="cell medium-8 medium-offset-2 large-6 large-offset-3 xlarge-5">
            {subscription && (!isUsedByAdmin)
              ? (
                <ProfilePerfectCandidateMessage
                  subscription={subscription}
                />
              )
              : (
                <ProfilePerfectCandidateForm />
              )}
          </div>
        </div>
      </div>
    </>
  );
});

export default compose(
  withLayout(ProfileLayout),
  withApolloSSR,
  withNamespaces([
    ...ProfileNamespaces,
    Namespaces.PerfectCandidate,
    Namespaces.Candidates,
  ]),
  withAuthUserPage({ redirectUrl: `${Routes.Profile}/contacts` }),
  withNoSubscriptionsPage(),
)(PerfectCandidateQuiz);
