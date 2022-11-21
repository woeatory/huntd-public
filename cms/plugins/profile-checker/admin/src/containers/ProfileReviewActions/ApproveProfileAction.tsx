import React, { memo, useCallback, useState } from 'react';
import { Button } from '@buffetjs/core';

interface Props {
  callback: () => Promise<any>
}
export const ApproveProfileAction = memo<Props>(({ callback }) => {
  const [loading, setLoading] = useState(false);

  const clickHandler = useCallback(async () => {
    setLoading(true);

    try {
      await callback();
      strapi.notification.toggle({
        type: 'success',
        message: 'Profile approved',
      });
    } catch (error) {
      strapi.notification.toggle({
        type: 'warning',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [callback]);

  return (
    <Button
      color="success"
      onClick={clickHandler}
      isLoading={loading}
    >
      Approve
    </Button>
  );
});
