import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';

export const JobsHeader: FC = () => {
  const { t } = useTranslation([Namespaces.Common]);

  return (
    <View style={styles.container}>
      <Text style={typography.heading}>
        {t(`${Namespaces.Common}:vacancies_page_title`)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
