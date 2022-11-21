import React, { memo } from 'react';
import { LoadingBar } from '@buffetjs/styles';
import { Padded } from '@buffetjs/core';

interface Props {
  loading?: boolean
}
export const TableLoadingBar = memo<Props>(({ loading }) => (
  <Padded bottom style={{ minHeight: '16px', marginTop: '10px' }}>
    {loading && (
      <LoadingBar />
    )}
  </Padded>
));
