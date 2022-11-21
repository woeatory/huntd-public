import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Button } from '@/components/Base/Button';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes } from '@/controllers/router/router.constants';
import { PrimaryProfile } from '@/controllers/graphql/generated';

export const EditProfile: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);
  const navigation = useNavigation();

  const onPress = useCallback(async () => {
    navigation.navigate(
      StackRoutes.ProfileFilling,
      { type: PrimaryProfile.Candidate },
    );
  }, [navigation]);

  return (
    <Button
      type={Button.type.Secondary}
      onPress={onPress}
      title={t(`${Namespaces.Profile}:edit`)}
    />
  );
};
