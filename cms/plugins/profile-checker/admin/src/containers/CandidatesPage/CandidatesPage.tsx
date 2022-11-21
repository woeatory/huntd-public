import React, { memo } from 'react';
import {
  CandidateProfilesBaseFragment,
  Enum_Candidateprofiles_Status,
  useCandidateProfilesQuery,
} from '@/controllers/graphql/cms/cms.generated';
import { CandidatesTable } from '@profile-checker/containers/CandidatesPage/Table';
import { TableLoadingBar } from '@profile-checker/components/TableLoadingBar';

export const CandidatesPage = memo(() => {
  const candidates = useCandidateProfilesQuery({
    variables: {
      sort: 'id:asc',
      where: {
        status: Enum_Candidateprofiles_Status.OnReview,
      },
    },
  });

  const profiles = (
    candidates.data?.candidateProfiles || []
  ) as CandidateProfilesBaseFragment[];

  return (
    <div className="container-fluid">
      <TableLoadingBar loading={candidates.loading} />
      <CandidatesTable profiles={profiles} />
    </div>
  );
});
