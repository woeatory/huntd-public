import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@/components/Header/BackButton';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { Spacer } from '@/components/Base/Spacer';

export const CompanyDetailsHeader: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <>
      <View style={styles.titleContainer}>
        <BackButton color={Colors.Citrus} />
        <Text style={styles.headingText}>
          {t(`${Namespaces.Profile}:profile_recruiter_title`)}
        </Text>
      </View>
      <Spacer height={8} />
      <Text style={styles.titleText}>
        {t(`${Namespaces.Profile}:profile_recruiter_message`)}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    ...typography.text,
    fontSize: 24,
    lineHeight: 34,
    marginLeft: 16,
  },
  titleText: {
    ...typography.text,
    color: Colors.Gray,
  },
});
