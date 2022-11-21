import React, { FC } from 'react';
import { CandidateProfilesBaseFragment } from '@/controllers/graphql/cms/cms.generated';
import { getImpersonateLoginLink } from '@/controllers/impersonamteLogin/impersonateLogin.getLink';
import { CandidateProfileActions } from '@profile-checker/containers/CandidatesPage/Actions';

interface Props {
  row: CandidateProfilesBaseFragment,
}

export const CandidatesRow: FC<Props> = ({ row }) => {
  const impersonateLink = getImpersonateLoginLink({
    email: row.user_id?.email || '',
    redirect: '/profile-preview/candidate',
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
        <p>{row.salary}</p>
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
        <CandidateProfileActions profile={row} />
      </td>
    </tr>
  );
};
