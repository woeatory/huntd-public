import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from '@/components/Base/Image';

interface Props {
  avatarUrl: string;
}

export const ContactsAvatar: FC<Props> = (props) => {
  const { avatarUrl } = props;

  return (
    <View style={styles.container}>
      <Image
        src={avatarUrl}
        size={136}
        borderRadius={136 / 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
