import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { ContactsModule } from '@/components/Contacts';
import { GlobalStyles } from '@/ui/theme/globalStyles';

export const ContactsScreen: FC = () => (
  <SafeAreaView style={GlobalStyles.safeAreaView}>
    <ContactsModule />
  </SafeAreaView>
);
