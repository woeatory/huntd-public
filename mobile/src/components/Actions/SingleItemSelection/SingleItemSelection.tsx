import React, { FC, useCallback } from 'react';
import {
  Text, StyleSheet, TouchableWithoutFeedback, View, FlatList,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { normalize } from '@/ui/theme/normalize';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { BackButton } from '@/components/Header/BackButton';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ItemSelection>;

export const SingleItemSelection: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const { backRoute, name, items } = route.params;

  const onFinish = useCallback((value) => {
    navigation.navigate(backRoute, {
      [name]: value,
    });
  }, [navigation, backRoute, name]);

  const renderItem = useCallback(({ item }) => {
    const onPress = () => onFinish(item.value);

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.flatItem}>
          <Text style={styles.flatText}>
            {item.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <BackButton style={{ marginBottom: normalize(8) }} />
      <FlatList
        keyExtractor={({ value }) => value}
        data={items}
        renderItem={renderItem}
        style={styles.flatList}
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
  flatItem: {
    paddingVertical: normalize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.Gray,
  },
  flatText: {
    ...typography.text,
    color: Colors.Semidark,
    fontSize: normalize(14),
  },
});
