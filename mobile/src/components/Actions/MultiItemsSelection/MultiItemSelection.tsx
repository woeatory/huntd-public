import React, { FC, useCallback, useState } from 'react';
import {
  Text, View, StyleSheet, FlatList, TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { BackButton } from '@/components/Header/BackButton';
import { normalize } from '@/ui/theme/normalize';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { MultiItem } from '@/components/Actions/MultiItemsSelection/MultiItem';
import { typography } from '@/ui/typography/typography.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ItemSelection>;

export const MultiItemSelection: FC = () => {
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { t } = useTranslation([Namespaces.Profile]);

  const [values, setValues] = useState<string[]>([]);
  const { name, backRoute, items } = params;

  const onFinish = useCallback(() => {
    navigation.navigate(backRoute, {
      [name]: values.join(','),
    });
  }, [backRoute, name, navigation, values]);

  const addItem = useCallback((value: string) => {
    setValues((currentValues) => [...currentValues, value]);
  }, []);

  const removeItem = useCallback((value: string) => {
    setValues((currentValues) => currentValues.filter(
      (currentValue) => currentValue !== value,
    ));
  }, []);

  const keyExtractor = useCallback(({ value }) => value, []);

  const renderItem = useCallback(({ item }) => (
    <MultiItem item={item} addItem={addItem} removeItem={removeItem} />
  ), [addItem, removeItem]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton style={{ marginBottom: normalize(8) }} />
        <TouchableWithoutFeedback onPress={onFinish}>
          <Text style={styles.actionText}>
            {t(`${Namespaces.Profile}:save_changes`)}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        style={styles.flatList}
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  flatList: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    ...typography.text,
    fontSize: 16,
  },
});
