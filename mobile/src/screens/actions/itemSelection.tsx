import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { SingleItemSelection } from '@/components/Actions/SingleItemSelection';
import { MultiItemSelection } from '@/components/Actions/MultiItemsSelection';
import { GlobalStyles } from '@/ui/theme/globalStyles';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ItemSelection>

export const ItemSelectionScreen: FC = () => {
  const route = useRoute<RouteProps>();
  const { multiSelection } = route.params;

  return (
    <SafeAreaView style={[GlobalStyles.safeAreaView]}>
      {multiSelection
        ? <MultiItemSelection />
        : <SingleItemSelection />}
    </SafeAreaView>
  );
};
