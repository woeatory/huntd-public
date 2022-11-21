import React, { FC, useCallback } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes } from '@/controllers/router/router.constants';

interface Props {
  profileType: PrimaryProfile;
}

export const ProfileLink: FC<Props> = (props) => {
  const { profileType } = props;

  const navigation = useNavigation();
  const { t } = useTranslation([Namespaces.Profile]);

  const navigationCallback = useCallback(() => {
    navigation.navigate(
      StackRoutes.ProfileFilling,
      { type: profileType },
    );
  }, [navigation, profileType]);

  return (
    <TouchableOpacity
      onPress={navigationCallback}
      activeOpacity={0.6}
      style={styles.container}
    >
      <View>
        <View style={{ marginBottom: 4 }}>
          <Text style={[styles.title, typography.smallCaption]}>
            {profileType.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.description, typography.caption]}>
          {t(`${Namespaces.Profile}:${profileType.toLowerCase()}_no_profile_description`)}
        </Text>
      </View>
      <ChevronRight color={Colors.Semidark} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.Citrus,
    marginBottom: 20,
  },
  title: {
    color: Colors.Citrus,
  },
  description: {
    color: Colors.Semidark,
  },
});
