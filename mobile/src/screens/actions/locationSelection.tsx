import React, {
  FC, useCallback,
} from 'react';
import {
  View, StyleSheet, SafeAreaView,
} from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GlobalStyles } from '@/ui/theme/globalStyles';
import { normalize } from '@/ui/theme/normalize';
import { BackButton } from '@/components/Header/BackButton';
import { CandidateProfileCityInput, CityTypes } from '@/controllers/graphql/generated';
import { formStyles } from '@/ui/form';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';

type RouteProps = RouteProp<
  StackRoutesParamList,
  StackRoutes.LocationSelection
>;

export const LocationSelectionScreen: FC = () => {
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { backRoute } = params;

  const addItem = useCallback((location: CandidateProfileCityInput) => {
    navigation.navigate(backRoute, {
      location,
    });
  }, [backRoute, navigation]);

  return (
    <SafeAreaView style={GlobalStyles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton style={{ marginBottom: normalize(8) }} />
        </View>
      </View>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails
        onPress={(data, details) => {

          if (details) {
            const countryInfo = details.address_components?.find(
              (component) => component.types.includes('country'),
            );
            let cityCountrySlug;
            let cityCountryName;

            if (countryInfo) {
              cityCountrySlug = countryInfo.short_name;
              cityCountryName = countryInfo.long_name;
            }

            addItem({
              cityId: data.place_id,
              cityName: details.name,
              cityTimezone: details.utc_offset,
              cityCountrySlug,
              cityCountryName,
              type: CityTypes.CandidateCity,
            });
          }
        }}
        query={{
          key: Config.GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            paddingHorizontal: normalize(20),
          },
          textInput: {
            ...formStyles.input,
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginBottom: normalize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
