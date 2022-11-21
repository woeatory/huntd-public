import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { formStyles } from '@/ui/form';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';
import { CandidateProfileCity } from '@/controllers/graphql/generated';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps & {
  initialLocation?: CandidateProfileCity,
};

export const LocationInput: FC<Props> = (props) => {
  const {
    invalid, onChange, placeholder, initialLocation,
  } = props;

  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();

  const profileLocation = useMemo(() => ({
    cityId: initialLocation?.cityId,
    cityName: initialLocation?.cityName,
    cityCountryName: initialLocation?.cityCountryName,
    cityCountrySlug: initialLocation?.cityCountrySlug,
    cityTimezone: initialLocation?.cityTimezone,
    type: initialLocation?.type,
  }), [initialLocation]);

  const onLocationPress = useCallback(() => {
    navigation.navigate(StackRoutes.LocationSelection, {
      backRoute: StackRoutes.ProfileFilling,
    });
  }, [navigation]);

  useEffect(() => {
    onChange(params.location || profileLocation);
  }, [onChange, params.location, profileLocation]);

  const cityName = useMemo(
    () => params.location?.cityName || profileLocation.cityName,
    [params.location?.cityName, profileLocation.cityName],
  );

  return (
    <TouchableWithoutFeedback onPress={onLocationPress}>
      <View style={[styles.container, invalid && formStyles.inputError]}>
        <Text style={styles.text}>
          {cityName || placeholder}
        </Text>
        <ChevronRight color={Colors.Gray} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...formStyles.inputTransparent,
  },
  text: {
    ...typography.mediumText,
    color: Colors.Semidark,
  },
});
