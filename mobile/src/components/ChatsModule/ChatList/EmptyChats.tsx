import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';

interface Props {
  title: string;
  subtitle: string;
}

export const EmptyChats: FC<Props> = (props) => {
  const { title, subtitle } = props;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.title, typography.caption]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.subtitle, typography.text]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  box: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.Black,
    paddingBottom: 4,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    color: Colors.Semidark,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.Gray,
  },
});
