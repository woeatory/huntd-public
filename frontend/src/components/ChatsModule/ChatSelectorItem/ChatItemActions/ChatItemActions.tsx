import React, { FC, useMemo, useCallback } from 'react';
import { IconDotsVertical } from '@/ui/icons/general/IconDotsVertical';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useArchiveChat } from '@/controllers/buddyChat/buddyChat.hooks/useArchiveChat';
import { useUnarchiveChat } from '@/controllers/buddyChat/buddyChat.hooks/useUnarchiveChat';
import { useDeleteChat } from '@/controllers/buddyChat/buddyChat.hooks/useDeleteChat';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import ChatSelectorItemStyles from '../ChatSelectorItem.module.scss';
import styles from './ChatItemActions.module.scss';

interface Props {
  profileConnectionId: number
}

interface ArchivationOptions {
  id: number
}

export const ChatItemActions: FC<Props> = ({ profileConnectionId }) => {
  const { t } = useTranslation([Namespaces.Chat]);
  const [archiveChat, { loading: archiving }] = useArchiveChat();
  const [unArchiveChat, { loading: unarchiving }] = useUnarchiveChat();
  const [deleteChat, { loading: deleting }] = useDeleteChat();
  const { selectedChats } = useBuddyChatContext();

  const showArchiveButton = useMemo(
    () => selectedChats !== ChatTypes.Archive,
    [selectedChats],
  );

  const archiveAction = useCallback(
    ({
      id,
    }: ArchivationOptions) => {
      const archiveFunction = showArchiveButton
        ? archiveChat
        : unArchiveChat;

      archiveFunction({
        variables: {
          id,
        },
      });
    },
    [showArchiveButton, archiveChat, unArchiveChat],
  );

  return (
    <span
      className={ChatSelectorItemStyles.chatActions}
      title={t(`${Namespaces.Chat}:chat_actions`)}
    >
      <div className={styles.actionsContainer}>
        <IconDotsVertical />

        <ul className={styles.actionsList}>
          <li className={styles.actionsListItem}>
            <Button
              className={styles.actionItem}
              disabled={archiving || unarchiving}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                archiveAction({
                  id: profileConnectionId,
                });
              }}
              text={showArchiveButton
                ? t(`${Namespaces.Chat}:action_archive`)
                : t(`${Namespaces.Chat}:action_unarchive`)}
            />
          </li>

          <li className={styles.actionsListItem}>
            <Button
              disabled={deleting}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                deleteChat({
                  variables: {
                    id: profileConnectionId,
                  },
                });
              }}
              className={styles.actionItem}
              text={t(`${Namespaces.Chat}:action_delete`)}
            />
          </li>
        </ul>
      </div>
    </span>
  );
};
