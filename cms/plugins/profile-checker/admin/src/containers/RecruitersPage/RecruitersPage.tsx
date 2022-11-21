import React, { memo } from 'react';
import {
  Enum_Recruiterprofiles_Status,
  RecruiterProfilesBaseFragment,
  useRecruiterProfilesQuery,
} from '@/controllers/graphql/cms/cms.generated';
import { RecruitersTable } from '@profile-checker/containers/RecruitersPage/Table';
import { TableLoadingBar } from '@profile-checker/components/TableLoadingBar';

export const RecruitersPage = memo(() => {
  const recruiters = useRecruiterProfilesQuery({
    variables: {
      sort: 'id:DESC',
      where: {
        status: Enum_Recruiterprofiles_Status.Active,
      },
    },
  });

  const profiles = (
    recruiters.data?.recruiterProfiles || []
  ) as RecruiterProfilesBaseFragment[];

  return (
    <div className="container-fluid">
      <TableLoadingBar loading={recruiters.loading} />
      <RecruitersTable profiles={profiles} />
    </div>
  );
});
