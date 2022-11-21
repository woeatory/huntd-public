import React, { FC } from 'react';
import { RecruiterProfilesBaseFragment } from '@/controllers/graphql/cms/cms.generated';
import { getImpersonateLoginLink } from '@/controllers/impersonamteLogin/impersonateLogin.getLink';
import { RecruiterProfileActions } from '@profile-checker/containers/RecruitersPage/Actions';

interface Props {
  row: RecruiterProfilesBaseFragment,
}

export const RecruitersRow: FC<Props> = ({ row }) => {
  const impersonateLink = getImpersonateLoginLink({
    email: row.user_id?.email || '',
    redirect: '/profile-preview/recruiter',
  });

  return (
    <tr>
      <td>
        <p>{row.user_id?.first_name}</p>
      </td>

      <td>
        <p>{row.user_id?.last_name}</p>
      </td>

      <td>
        <p>{row.position}</p>
      </td>

      <td>
        <p>{row.company_name}</p>
      </td>

      <td>
        <a
          href={impersonateLink}
          target="_blank"
          rel="noreferrer"
        >
          {impersonateLink}
        </a>
      </td>

      <td>
        <p>{row.status}</p>
      </td>

      <td>
        <RecruiterProfileActions profile={row} />
      </td>
    </tr>
  );
};
