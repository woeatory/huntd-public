import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { HeaderBackButton } from '@/components/Header/HeaderBackButton';

export const NotificationsHeaderLeft: FC = () => {
  const { t } = useTranslation([Namespaces.Common]);

  return <HeaderBackButton text={t(`${Namespaces.Common}:notifications`)} />;
};
