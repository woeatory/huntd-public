import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@/components/Header/BackButton';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';

export const ContactsHeader: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <View style={styles.titleContainer}>
        <BackButton color={Colors.Citrus} />
        <Text style={styles.title}>
          {t(`${Namespaces.Profile}:profile_contacts_title`)}
        </Text>
      </View>
      <Text style={styles.message}>
        {t(`${Namespaces.Profile}:profile_contacts_message`)}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...typography.text,
    fontSize: 24,
    lineHeight: 34,
    marginLeft: 16,
  },
  message: {
    ...typography.text,
    color: Colors.Gray,
  },
});
