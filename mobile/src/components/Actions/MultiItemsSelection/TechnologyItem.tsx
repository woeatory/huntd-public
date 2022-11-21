import React, { FC, useCallback, useState } from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { normalize } from '@/ui/theme/normalize';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { Check } from '@/components/Base/Check';
import { SelectOption } from '@/controllers/form/form.constants';

type Props = {
  item: SelectOption,
  addItem: (value: number) => void;
  removeItem: (value: number) => void;
  checked?: boolean;
};

export const TechnologyItem: FC<Props> = (props) => {
  const {
    item, addItem, removeItem, checked,
  } = props;
  const [selected, setSelected] = useState(checked || false);

  const onPress = useCallback(() => {
    if (selected) {
      removeItem(+item.value);
    } else {
      addItem(+item.value);
    }

    setSelected((currentValue) => !currentValue);
  }, [addItem, item.value, removeItem, selected]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.flatItem}>
        <Text style={styles.label}>
          {item.label}
        </Text>
        <Check checked={selected} color={Colors.Gray} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: normalize(8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  label: {
    ...typography.mediumText,
    color: Colors.Semidark,
  },
});
