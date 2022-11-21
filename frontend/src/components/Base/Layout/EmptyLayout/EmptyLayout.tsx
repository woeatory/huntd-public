import React, { FC } from 'react';
import Layout from '@/components/Base/Layout/Layout.module.scss';

export const EmptyLayout: FC = (props) => {
  const { children } = props;

  return (
    <>
      <div className={Layout.emptyPage}>
        {children}
      </div>
    </>
  );
};
