import React, { memo } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';

interface Props {
  createdAt: string;
  updatedAt: string;
}

export const MessageDate = memo<Props>(({ createdAt, updatedAt }) => {
  const createdDate = new Date(createdAt);
  const updatedDate = new Date(updatedAt);

  const { i18n } = useTranslation([Namespaces.Common]);
  const { t } = useTranslation([Namespaces.Chat]);

  const formatter = new Intl.DateTimeFormat(i18n.language, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const dateContent = updatedAt > createdAt
    ? `${t(`${Namespaces.Chat}:message_edited`)} ${formatter.format(updatedDate)}`
    : `${formatter.format(createdDate)}`;

  return (
    <span>
      {dateContent}
    </span>
  );
});
