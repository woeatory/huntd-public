import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import {
  Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import Config from 'react-native-config';
import { useTranslation } from 'react-i18next';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GlobalStyles } from '@/ui/theme/globalStyles';
import { normalize } from '@/ui/theme/normalize';
import { BackButton } from '@/components/Header/BackButton';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { CandidateProfileCityInput, CityTypes } from '@/controllers/graphql/generated';
import { Colors } from '@/ui/theme/colors';
import { formStyles } from '@/ui/form';
import { CloseIcon } from '@/ui/icons/general/CloseIcon';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.CitySelection>;

export const CitySelectionScreen: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);
  const { params } = useRoute<RouteProps>();

  const [cities, setCities] = useState<Set<CandidateProfileCityInput>>(
    new Set(params.cities),
  );

  const navigation = useNavigation();
  const { backRoute } = params;

  const onFinish = useCallback(() => {
    navigation.navigate(backRoute, {
      cities: [...cities],
    });
  }, [backRoute, cities, navigation]);

  const addItem = useCallback((city: CandidateProfileCityInput) => {
    setCities((currentCities) => new Set([...currentCities, city]));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCities((currentCities) => new Set([...currentCities].filter(
      (currentCity) => currentCity.cityId !== id,
    )));
  }, []);

  const citiesToRender = useMemo(() => [...cities], [cities]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.flatItem}>
      <Text style={styles.flatLabel}>
        {item.cityName}
      </Text>
      <TouchableWithoutFeedback onPress={() => removeItem(item.cityId)}>
        <CloseIcon color={Colors.LightGray} />
      </TouchableWithoutFeedback>
    </View>
  ), [removeItem]);

  return (
    <SafeAreaView style={GlobalStyles.safeAreaView}>
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
          data={citiesToRender}
          keyExtractor={(city) => city.cityId}
          renderItem={renderItem}
        />
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
              type: CityTypes.OfficeCity,
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
  actionText: {
    ...typography.text,
    fontSize: 16,
  },
  flatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.Gray,
  },
  flatLabel: {
    ...typography.text,
  },
});
