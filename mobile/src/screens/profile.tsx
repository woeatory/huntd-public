import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/ui/theme/colors';
import { ProfileModule } from '@/components/ProfileModule';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { NoProfiles } from '@/components/ProfileModule/NoProfiles';
import { PrimaryProfile } from '@/controllers/graphql/generated';

export const ProfileScreen: FC = () => {
  const [user] = useAuthUser();

  const ProfileComponent = useMemo(() => {
    switch (user?.primaryProfile) {
      case PrimaryProfile.Candidate:
      case PrimaryProfile.Recruiter:
        return ProfileModule;

      default:
        return NoProfiles;
    }
  }, [user?.primaryProfile]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ProfileComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
