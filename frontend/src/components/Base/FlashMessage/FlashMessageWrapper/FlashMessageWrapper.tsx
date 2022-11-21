import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FlashMessage,
  useVisibleMessagesQuery,
} from '@/controllers/graphql/generated';
import { FlashMessageItem } from '@/components/Base/FlashMessage/FlashMessageItem';
import styles from './FlashMessageWrapper.module.scss';

export const FlashMessageWrapper = () => {
  const { data } = useVisibleMessagesQuery();
  const [root, setRoot] = useState<HTMLBodyElement | null>(null);

  const messages: FlashMessage[] = data?.visibleMessages ?? [];

  useEffect(() => {
    setRoot(document.querySelector('body'));
  }, []);

  return root
    ? createPortal(
      <div className={styles.flashMessageWrapper}>
        {messages.map((message) => (
          <FlashMessageItem key={message.id} {...message} />
        ))}
      </div>,
      root,
    )
    : null;
};
