import React, { FC } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export const ChatActions: FC = (props) => {
  const { children } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        { width: dimensions.width },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
  },
});
