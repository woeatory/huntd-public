import React, { FC } from 'react';
import {
  Linking, StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { ArrowLeft } from '@/ui/icons/general/ArrowLeft';

interface Props {
  title: string;
  link: string
}

export const ProfilePreviewLink: FC<Props> = (props) => {
  const { title, link } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => Linking.openURL(link)}
    >
      <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        <ArrowLeft
          style={{ transform: [{ rotate: '135deg' }] }}
          color={Colors.Citrus}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    ...typography.text,
    color: Colors.Citrus,
    marginRight: 4,
  },
});
