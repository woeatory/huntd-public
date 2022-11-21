import React, { memo } from 'react';
import { Table } from '@buffetjs/core';
import { CandidateProfilesBaseFragment } from '@/controllers/graphql/cms/cms.generated';
import { CandidatesRow } from './Row';

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
    name: 'Salary',
    value: 'salary',
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
  profiles: CandidateProfilesBaseFragment[]
}

export const CandidatesTable = memo<Props>((props) => (
  <div className="table-wrapper">
    <Table
      headers={headers}
      rows={props.profiles}
      customRow={CandidatesRow}
    />
  </div>

));
