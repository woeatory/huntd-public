import React, { memo, useCallback, useState } from 'react';
import {
  Button, Flex, Padded, Picker, Text, Textarea,
} from '@buffetjs/core';

interface Props {
  callback: (rejectReason: string) => Promise<any>
}
export const RejectProfileAction = memo<Props>(({ callback }) => {
  const [loading, setLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const clickHandler = useCallback(
    async () => {
      setLoading(true);

      try {
        await callback(rejectReason);
        strapi.notification.toggle({
          type: 'success',
          message: 'Profile rejected',
        });
      } catch (error) {
        strapi.notification.toggle({
          type: 'warning',
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [callback, rejectReason],
  );

  return (
    <div className="picker-right">
      <Picker
        className="test"
        renderButtonContent={() => 'Reject'}
        renderSectionContent={(onToggle: any) => (
          <form onSubmit={async (e) => {
            e.preventDefault();
            await clickHandler();
            onToggle();
          }}
          >
            <Padded top right bottom left size="sm">
              <Padded bottom size="sm">
                <Text fontWeight="bold">Add reject reason</Text>
              </Padded>

              <Padded bottom size="sm">
                <Textarea
                  style={{ width: '450px', height: '100px' }}
                  name="reject_reason"
                  onChange={(e: any) => setRejectReason(e.target.value)}
                  value={rejectReason}
                  required
                />
              </Padded>

              <Flex
                justifyContent="flex-end"
              >
                <Button
                  color="delete"
                  isLoading={loading}
                  type="submit"
                >
                  Reject
                </Button>
              </Flex>
            </Padded>
          </form>
        )}
      />
    </div>
  );
});
