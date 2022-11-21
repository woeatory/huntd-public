import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Routes } from '@/controllers/router/router.constants';
import HeaderNavStyles
  from '@/components/Base/Header/HeaderNav/HeaderNav.module.scss';
import { ActiveNavLink } from '@/components/Base/ActiveNavLink';
import {
  UserUnreadMessagesCountUpdatedDocument,
  UserUnreadMessagesCountUpdatedSubscription,
  useUserUnreadMessagesCountQuery,
} from '@/controllers/graphql/generated';
import styles from './HeaderChatsLink.module.scss';

export const HeaderChatsLink = () => {
  const { t } = useTranslation([Namespaces.Common]);
  const userUnreadMessagesCountQueryResult = useUserUnreadMessagesCountQuery();

  const unreadMessagesCount = useMemo(() => {
    if (
      !userUnreadMessagesCountQueryResult.data?.authUser?.unreadMessagesCount
    ) {
      return 0;
    }

    return userUnreadMessagesCountQueryResult.data.authUser.unreadMessagesCount;
  }, [userUnreadMessagesCountQueryResult.data]);

  useEffect(() => {
    const unsubscribe = userUnreadMessagesCountQueryResult.subscribeToMore<
      UserUnreadMessagesCountUpdatedSubscription
    >({
      document: UserUnreadMessagesCountUpdatedDocument,
      updateQuery: (
        prev,
        { subscriptionData },
      ) => {
        if (!subscriptionData.data.userUnreadMessagesCountUpdated
          || !prev.authUser) {
          return prev;
        }

        const { userUnreadMessagesCountUpdated } = subscriptionData.data;

        return {
          authUser: {
            ...prev.authUser,
            unreadMessagesCount: userUnreadMessagesCountUpdated
              .unreadMessagesCount,
          },
        };
      },
    });

    return () => unsubscribe();
  }, [userUnreadMessagesCountQueryResult]);

  return (
    <ActiveNavLink href={Routes.Chats}>
      <a className={cn(
        HeaderNavStyles.navLink,
        styles.chatsLink,
      )}
      >
        {t(`${Namespaces.Common}:chats_link`)}
        {unreadMessagesCount > 0 && (
          <span className={styles.unreadMessagesCount}>
            {unreadMessagesCount}
          </span>
        )}
      </a>
    </ActiveNavLink>
  );
};
