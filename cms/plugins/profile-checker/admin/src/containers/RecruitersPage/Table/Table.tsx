import React, { memo } from 'react';
import { Table } from '@buffetjs/core';
import { RecruiterProfilesBaseFragment } from '@/controllers/graphql/cms/cms.generated';
import { RecruitersRow } from './Row';

const headers = [
  {
    name: 'First name',
    value: 'first_name',
  },
  {
    name: 'Last name',
    value: 'last_name',
  },
  {
    name: 'Position',
    value: 'position',
  },
  {
    name: 'Company Name',
    value: 'company_name',
  },
  {
    name: 'Impersonate login',
    value: 'impersonate_login',
  },
  {
    name: 'Status',
    value: 'status',
  },
  {
    name: 'Actions',
    value: 'actions',
  },
];

interface Props {
  profiles: RecruiterProfilesBaseFragment[]
}

export const RecruitersTable = memo<Props>((props) => (
  <div className="table-wrapper">
    <Table
      headers={headers}
      rows={props.profiles}
      customRow={RecruitersRow}
    />
  </div>
));
