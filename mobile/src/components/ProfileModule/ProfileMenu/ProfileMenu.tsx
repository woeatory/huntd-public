import React, { FC, useCallback } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { StackRoutes } from '@/controllers/router/router.constants';
import { useProfileContext } from '@/controllers/profile/profile.context';
import { PrimaryProfile } from '@/controllers/graphql/generated';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';

interface Props {
  profileSlug: string;
}

export const ProfileMenu: FC<Props> = (props) => {
  const { profileSlug } = props;

  const { profileType } = useProfileContext();
  const { t } = useTranslation([Namespaces.Common, Namespaces.Profile]);
  const navigation = useNavigation();

  const handleProfileClick = useCallback(() => {
    navigation.navigate(
      profileType === PrimaryProfile.Candidate
        ? StackRoutes.Candidate
        : StackRoutes.Recruiter,
      { slug: profileSlug },
    );
  }, [profileType, profileSlug, navigation]);

  const handleContactsClick = useCallback(() => {
    navigation.navigate(StackRoutes.Contacts);
  }, [navigation]);

  const handlePreferencesClick = useCallback(
    () => navigation.navigate(StackRoutes.Preferences),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleProfileClick}
        style={styles.item}
      >
        <Text style={styles.text}>
          {t(`${Namespaces.Common}:my_profile`)}
        </Text>
        <ChevronRight width={16} height={16} color={Colors.Semidark} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleContactsClick}
        style={styles.item}
      >
        <Text style={styles.text}>
          {t(`${Namespaces.Profile}:my_contacts`)}
        </Text>
        <ChevronRight width={16} height={16} color={Colors.Semidark} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePreferencesClick}
        style={styles.item}
      >
        <Text style={styles.text}>
          {t(`${Namespaces.Common}:preferences`)}
        </Text>
        <ChevronRight width={16} height={16} color={Colors.Semidark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.LightGray,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  text: {
    ...typography.caption,
    color: Colors.Semidark,
  },
});
