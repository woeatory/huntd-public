import React, { FC } from 'react';
import { Loader } from '@/ui/Loader/Loader';

interface Props {
  loading: boolean
}
export const WithLoader: FC<Props> = ({ loading, children }) => (
  <>
    {loading
      ? <Loader active />
      : children}
  </>
);
