import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ContactsAvatar } from '@/components/Contacts/components/ContactsAvatar';
import { ContactsFields } from '@/components/Contacts/components/ContactsFields';
import { ContactsHeader } from '@/components/Contacts/components/ContactsHeader';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

export const ContactsModule: FC = () => {
  const [authUser] = useAuthUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <ContactsHeader />
      </View>

      <View>
        {authUser?.avatar && (
          <View style={styles.avatarSection}>
            <ContactsAvatar avatarUrl={authUser.avatar.url} />
          </View>
        )}

        <ContactsFields />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerSection: {
    marginBottom: 24,
  },
  avatarSection: {
    marginBottom: 24,
  },
});
