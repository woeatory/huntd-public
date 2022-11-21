import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckIcon } from '@/ui/icons/general/CheckIcon';
import { DoubleCheckIcon } from '@/ui/icons/general/DoubleCheckIcon';
import { Colors } from '@/ui/theme/colors';
import { normalize } from '@/ui/theme/normalize';

interface Props {
  unread: boolean;
}

export const MessageStatus: FC<Props> = (props) => {
  const { unread } = props;

  return (
    <View style={styles.container}>
      {unread
        ? <CheckIcon color={Colors.Citrus} />
        : <DoubleCheckIcon color={Colors.Citrus} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: normalize(4),
  },
});
