import React, {
  useMemo, useState,
  useEffect, useCallback,
  FC,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  CandidateProfile, PrimaryProfile,
  PublicProfilesOptions,
  useAuthUserConnectionsQuery,
  usePublicCandidateProfilesQuery,
} from '@/controllers/graphql/generated';
import { Loader } from '@/ui/Loader';
import typography from '@/ui/typography/typography.module.scss';
import { FiltersProvider, useFiltersContext } from '@/components/Profile/ProfilesListModule/Filters/filters.context';
import { useBodyScrollLock } from '@/controllers/modal/modal.hooks/useBodyScrollLock';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { FiltersMobileButton } from '@/components/Profile/ProfilesListModule/Filters/FiltersMobileButton';
import { CandidateProfileCard } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { useLatestRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useLatestRecruiterProfile';
import { FiltersModule } from '@/components/Profile/ProfilesListModule/Filters';
import { FilteredResultCount } from '@/components/Profile/ProfilesListModule/CandidateProfilesList/FilteredResultCount/FilteredResultCount';
import styles from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfilesList.module.scss';
import { Features } from '@/controllers/features/features.constants';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { useQueryBuilder } from '@/controllers/candidateProfile/candidateProfile.hooks/useQueryBuilder';
import { NotAuthorizedFiltersTypes } from '@/components/Profile/ProfilesListModule/Filters/NotAuthorizedFilters';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { Button } from '@/ui/buttons/Button';
import { Routes, Web3FilterSearchQuery } from '@/controllers/router/router.constants';
import { Selectors } from '@/lib/selectors';
import { analytics } from '@/controllers/analytics/analytics.client';
import { ConnectionsHintValues } from '@/components/Profile/profile.constants';
import {
  getConnectionsHintMaxValue,
} from '@/controllers/recruiterProfile/getConnectionsHintMaxValue';

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

const ConnectProfileAction = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectProfileAction');

    return mod.ConnectProfileAction;
  },
  {
    ssr: false,
  },
);

const RoundProgressBar = dynamic(
  async () => {
    const mod = await import('@/components/RoundProgressBar');

    return mod.RoundProgressBar;
  },
  {
    ssr: false,
  },
);

const EmptyList = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/EmptyList');

    return mod.EmptyList;
  },
  {
    ssr: false,
  },
);

const NotAuthorizedFilters = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/Filters/NotAuthorizedFilters');

    return mod.NotAuthorizedFilters;
  },
  {
    ssr: false,
  },
);

const Sidebar = dynamic(
  async () => {
    const mod = await import('@/components/Base/Sidebar/Sidebar');

    return mod.Sidebar;
  },
  {
    ssr: false,
  },
);

const CreateSubscriptionButton = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/CandidateProfilesList/CreateSubscriptionButton');

    return mod.CreateSubscriptionButton;
  },
  {
    ssr: false,
  },
);

const ConnectionsHintModule = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ConnectionsHintModule/ConnectionsHintModule');

    return mod.ConnectionsHintModule;
  },
  {
    ssr: false,
  },
);

const FetchMoreButton = dynamic(
  async () => {
    const mod = await import('@/components/Profile/ProfilesListModule/CandidateProfilesList/FetchMoreButton');

    return mod.FetchMoreButton;
  },
  {
    ssr: false,
  },
);

interface Props {
  searchParams?: string[];
}

export const CandidateProfilesList: FC<Props> = (props) => {
  const { t } = useTranslation([Namespaces.Common]);
  const { query } = useRouter();

  const { searchParams } = props;
  const [searchParam] = searchParams ?? [];

  const { whereClause: where } = useQueryBuilder(query);
  const paginationFeature = useFeature(Features.CandidatesPagination);
  const web3SearchQueries: string[] = Object.values(Web3FilterSearchQuery);

  const options: PublicProfilesOptions = {
    forceRealList: web3SearchQueries.includes(searchParam),
  };

  const {
    loading, data, error, fetchMore,
  } = usePublicCandidateProfilesQuery({
    variables: {
      where,
      options,
    },
  });

  const [
    candidate,
    setCandidate,
  ] = useState<CandidateProfile | null>(null);
  const { isModalOpened, openModal, closeModal } = useModalState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useBodyScrollLock(false);
  const { formMethods, setFormMethods } = useFiltersContext();

  const [
    selectedSubscription,
    setSelectedSubscription,
  ] = useState<SelectOption | null>(null);

  useEffect(() => {
    const withUtmParams = Boolean(query.utm_campaign);

    if (withUtmParams) {
      analytics.sendEvent(
        analytics.events.subscriptions.SubscriptionsEmailAllClicked,
        {
          source: query.utm_campaign,
        },
      );
    }
  }, [query]);

  useEffect(() => {
    setIsScrollLocked(isSidebarOpened);
  }, [isScrollLocked, isSidebarOpened, setIsScrollLocked]);

  const [authUser] = useAuthUser();
  const [recruiterProfile] = useLatestRecruiterProfile();

  const isRecruiter = authUser?.primaryProfile === PrimaryProfile.Recruiter;

  const candidates = useMemo(
    () => data?.publicCandidateProfiles.rows ?? [],
    [data],
  );

  const numberOfCandidates = useMemo(
    () => {
      const candidateCount = data?.publicCandidateProfiles.count;

      return candidateCount ?? 0;
    },
    [data],
  );

  const hasMore = useMemo(
    () => data?.publicCandidateProfiles.hasMore ?? false,
    [data],
  );

  const shouldButtonRender = !!numberOfCandidates
    && !selectedSubscription
    && !hasMore;

  const { data: connectionsData } = useAuthUserConnectionsQuery();

  const connectionsCount
    = connectionsData?.authUser?.profileConnections?.length || 0;

  const maxHintValue = getConnectionsHintMaxValue(connectionsCount);

  const activeConnections = useMemo(
    () => {
      if (connectionsData?.authUser?.profileConnections?.length) {
        return connectionsData?.authUser?.profileConnections
          ?.reduce((acc, connection) => {
            acc.set(connection.candidateProfile.id, `${connection.id}-${connection.candidateProfile.slug}`);

            return acc;
          },

            new Map<number, string>(),
          );
      }

      return null;
    }, [connectionsData],
  );

  const closeSidebar = useCallback(() => {
    setIsSidebarOpened(false);
  }, [setIsSidebarOpened]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpened((isOpened) => !isOpened);
  }, [setIsSidebarOpened]);

  return (
    <FiltersProvider
      data={{
        formMethods,
        setFormMethods,
      }}
    >
      <div className={styles.sidebarWrapper}>
        <Sidebar
          isOpened={isSidebarOpened}
          closeSideBar={closeSidebar}
        >
          <FiltersModule
            loading={loading}
            error={error?.message}
            isSidebarOpened={isSidebarOpened}
            closeSideBar={closeSidebar}
            filteredCandidatesCount={numberOfCandidates}
            selectedSubscription={selectedSubscription}
            setSelectedSubscription={setSelectedSubscription}
            searchParams={searchParams}
          />
        </Sidebar>
      </div>

      <div className="grid-x grid-margin-x">
        <div className={cn('cell large-4', cn(styles.filtersWrapper), {
          [Selectors.Disabled]: !authUser,
        })}
        >
          <h1 className={cn(typography.h1, styles.title)}>
            {t(`${Namespaces.Common}:candidates_list_page_title`)}
          </h1>

          <div className={styles.filters}>
            <FiltersModule
              isSidebarOpened={isSidebarOpened}
              loading={loading}
              error={error?.message}
              selectedSubscription={selectedSubscription}
              setSelectedSubscription={setSelectedSubscription}
              searchParams={searchParams}
            />
          </div>

          <NotAuthorizedFilters
            type={NotAuthorizedFiltersTypes.Desktop}
            user={authUser}
          />
        </div>
        <div className={cn('cell large-8 position-relative', styles.list)}>
          <div className={cn(styles.mobileFiltersWrapper)}>
            <div className={styles.mobileUpperSection}>
              <div className={`${styles.mobileButton}`}>
                <FiltersMobileButton
                  clickHandler={toggleSidebar}
                  isOpened={isSidebarOpened}
                />
              </div>
              {isRecruiter
                && connectionsCount < 20
                && (
                  <div className={styles.hintContainer}>
                    <RoundProgressBar
                      className={styles.progressBarContainer}
                      value={connectionsCount}
                      minValue={ConnectionsHintValues.minValue}
                      maxValue={maxHintValue}
                      strokeWidth={ConnectionsHintValues.strokeWidth}
                      pathColor={ConnectionsHintValues.pathColor}
                      trailColor={ConnectionsHintValues.trailColor}
                    />
                    <ConnectionsHintModule
                      count={connectionsCount}
                    />
                  </div>
                )}
            </div>

            <FilteredResultCount count={numberOfCandidates} />

          </div>
          <Loader active={loading} />
          {loading || !numberOfCandidates
            ? (
              <EmptyList
                loading={loading}
                selectedSubscription={selectedSubscription}
                className={cn({
                  [styles.hidden]: loading,
                })}
              />
            )
            : candidates.map((profile, index) => {
              const isConnected = !!activeConnections?.has(profile.id);

              return (
                <div
                  className={styles.listItem}
                  key={profile.id}
                >
                  <CandidateProfileCard
                    candidate={profile}
                    setCandidate={setCandidate}
                    openModal={openModal}
                    isConnected={isConnected}
                    slug={activeConnections?.get(profile.id)}
                    tabIndex={index}
                  />
                </div>
              );
            })}
          {Object.keys(where).length > 0
            && shouldButtonRender
            && (
              <CreateSubscriptionButton
                buttonText={t(`${Namespaces.Common}:notify_me_by_email`)}
                labelText={t(`${Namespaces.Common}:need_more_candidates`)}
                labelClassName={styles.subscriptionButtonLabel}
                withLabel
              />
            )}
          {candidate
              && (
              <Modal
                isOpen={isModalOpened}
                closeModal={closeModal}
              >
                <ConnectProfileAction
                  isAnonymous={!authUser?.id}
                  candidateProfileId={candidate.id}
                  candidateProfile={candidate}
                  recruiterProfileId={recruiterProfile?.id}
                  recruiterProfileStatus={recruiterProfile?.status}
                  closeModal={closeModal}
                />
              </Modal>
              )}
        </div>

        {paginationFeature.isEnabled()
            && authUser
            && !loading
            && numberOfCandidates > 0
            && (
              <div className='cell large-2 large-offset-6 mt-48'>
                <FetchMoreButton
                  hasMore={hasMore}
                  offset={candidates.length}
                  variables={{ where, options }}
                  fetchMore={fetchMore}
                />
              </div>
            )}

        {!authUser
          && (numberOfCandidates - candidates.length) > 0
          && (
            <div className='cell large-3 large-offset-6 mt-48'>
              <Button
                size={Button.size.LargeWide}
                className={styles.topCandidatesButton}
                mode={Button.mode.Primary}
                text={t(`${Namespaces.Common}:top_candidates_button`, { numberOfCandidates: numberOfCandidates - candidates.length })}
                href={Routes.SignUp}
              />
            </div>
          )}
      </div>
    </FiltersProvider>
  );
};
