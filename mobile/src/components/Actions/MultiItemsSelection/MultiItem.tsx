import React, { FC, useCallback, useState } from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { normalize } from '@/ui/theme/normalize';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { Checkbox } from '@/components/Base/Checkbox';
import { SelectOption } from '@/controllers/form/form.constants';

type Props = {
  item: SelectOption,
  addItem: (value: string) => void;
  removeItem: (value: string) => void;
};

export const MultiItem: FC<Props> = (props) => {
  const { item, addItem, removeItem } = props;
  const [selected, setSelected] = useState(false);

  const onPress = useCallback(() => {
    if (selected) {
      removeItem(item.value);
    } else {
      addItem(item.value);
    }

    setSelected((currentValue) => !currentValue);
  }, [addItem, item.value, removeItem, selected]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>
          {item.label}
        </Text>
        <Checkbox checked={selected} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: normalize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.Gray,
  },
  label: {
    ...typography.text,
    color: Colors.Semidark,
    fontSize: normalize(14),
  },
});
