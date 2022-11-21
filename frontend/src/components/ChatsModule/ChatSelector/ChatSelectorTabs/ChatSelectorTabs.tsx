import React from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { Selectors } from '@/lib/selectors';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import styles from './ChatSelectorTabs.module.scss';

export const ChatSelectorTabs = () => {
  const { t } = useTranslation([Namespaces.Chat]);
  const { selectedChats, setSelectedChats } = useBuddyChatContext();

  return (
    <div className={styles.chatSelectorTabs}>
      <Button
        type="button"
        className={cn(styles.chatSelectorTab, typography.overhead, {
          [Selectors.Active]: selectedChats === ChatTypes.All,
        })}
        onClick={() => setSelectedChats(ChatTypes.All)}
        text={t(`${Namespaces.Chat}:all_chats`)}
      />

      <Button
        type="button"
        className={cn(styles.chatSelectorTab, typography.overhead, {
          [Selectors.Active]: selectedChats === ChatTypes.Archive,
        })}
        onClick={() => setSelectedChats(ChatTypes.Archive)}
        text={t(`${Namespaces.Chat}:archive_chats`)}
      />
    </div>
  );
};
