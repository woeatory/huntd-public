import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { formStyles } from '@/ui/form';
import { CandidateProfileCityInput, CityTypes } from '@/controllers/graphql/generated';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { CloseIcon } from '@/ui/icons/general/CloseIcon';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps;

export const JobCitiesSelect: FC<Props> = (props) => {
  const [profile] = useLatestCandidateProfile();
  const { invalid, onChange, placeholder } = props;
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();

  const [
    profileCities,
    setProfileCities,
  ] = useState<Set<CandidateProfileCityInput>>(new Set(
    profile?.cities?.filter(
      (city) => city.type === CityTypes.OfficeCity,
    ).map((city) => ({
      cityId: city.cityId,
      cityName: city.cityName,
    })),
  ));

  useEffect(() => {
    const updatedCities = params.cities || [];

    setProfileCities((prev) => new Set([...prev, ...updatedCities]));
  }, [params.cities]);

  const onCitiesPress = useCallback(() => {
    navigation.navigate(StackRoutes.CitySelection, {
      backRoute: StackRoutes.ProfileFilling,
      cities: [...profileCities],
    });
  }, [navigation, profileCities]);

  useEffect(() => {
    onChange([...profileCities].length ? [...profileCities] : '');
  }, [onChange, params.cities, profileCities]);

  const removeCity = useCallback((cityId: string) => {
    setProfileCities(
      ((prevCities) => new Set(
        [...prevCities].filter(
          (city) => city.cityId !== cityId,
        ),
      )),
    );
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={onCitiesPress}>
        <View style={[styles.container, invalid && formStyles.inputError]}>
          <Text style={[styles.text, profileCities && styles.filled]}>
            {placeholder}
          </Text>
          <ChevronRight color={Colors.Gray} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.selected}>
        {[...profileCities].map((city) => (
          <TouchableWithoutFeedback
            onPress={() => removeCity(city.cityId)}
            key={city.cityId}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>{city.cityName}</Text>
              <CloseIcon color={Colors.Semidark} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </>
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
  filled: {
    color: Colors.Semidark,
  },
  selected: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.LightPeach,
    marginRight: 16,
    marginBottom: 16,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  itemText: {
    ...typography.mediumText,
    color: Colors.Semidark,
    marginRight: 4,
  },
});
