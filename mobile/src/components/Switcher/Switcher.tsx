import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonType } from '@/components/Base/Button';
import { Colors } from '@/ui/theme/colors';

interface Props {
  value: boolean;
  setValue: (value: boolean) => void;
  activeTitle: string;
  inactiveTitle: string;
}

export const Switcher: FC<Props> = (props) => {
  const {
    value, setValue, activeTitle, inactiveTitle,
  } = props;

  return (
    <View style={styles.container}>
      <Button
        style={!value && { backgroundColor: Colors.White }}
        type={ButtonType.Switcher}
        onPress={() => {
          setValue(false);
        }}
        title={activeTitle}
      />
      <Button
        style={value && { backgroundColor: Colors.White }}
        type={ButtonType.Switcher}
        onPress={() => {
          setValue(true);
        }}
        title={inactiveTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 8,
    flexDirection: 'row',
    backgroundColor: Colors.Pampas,
    height: 32,
    padding: 4,
    borderRadius: 4,
  },
});
