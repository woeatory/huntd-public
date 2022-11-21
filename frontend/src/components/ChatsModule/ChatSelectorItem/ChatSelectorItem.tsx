import React, { FC } from 'react';
import cn from 'classnames';
import { Selectors } from '@/lib/selectors';
import { IconEyeOff } from '@/ui/icons/general/IconEyeOff';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { UnreadMark } from '@/components/Base/UnreadMark';
import { Link } from '@/controllers/i18n/i18n.client';
import { ChatItemActions } from '@/components/ChatsModule/ChatSelectorItem/ChatItemActions';
import { TimeAgoModule } from '@/components/Base/TimeAgoModule/TimeAgoModule';
import styles from './ChatSelectorItem.module.scss';

interface Props {
  active?: boolean;
  title: string;
  name?: string;
  id: number;
  unread: boolean;
  link: string;
  lastActionTime: string | null;
  companyName?: string | null;
}
export const ChatSelectorItem: FC<Props> = (props) => {
  const {
    active, title, name, unread, link, id, lastActionTime, companyName,
  } = props;

  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <Link href={link}>
      <a
        className={cn(
          styles.chatSelectorItem, {
            [Selectors.Active]: active,
          },
        )}
      >

        <div className={styles.chatName}>
          {name || (
            <>
              <IconEyeOff />
              {t(`${Namespaces.Chat}:contacts_hidden`)}
            </>
          )}
        </div>

        <div className={styles.chatTitle}>
          {companyName ? `${companyName} | ` : ''}
          {title}

          <UnreadMark active={unread} />
        </div>

        <div className={styles.chatDate}>
          <TimeAgoModule
            lastActionTime={lastActionTime}
          />
        </div>

        <ChatItemActions profileConnectionId={id} />
      </a>
    </Link>
  );
};
