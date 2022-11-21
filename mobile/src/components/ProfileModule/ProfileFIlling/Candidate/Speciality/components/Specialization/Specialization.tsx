import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useSpecializations } from '@/controllers/candidateProfile/candidateProfile.hooks/useSpecializations';
import { getSpecializationOptions } from '@/controllers/candidateProfile/candidateProfile.helpers/getSpecializationOptions';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { formStyles } from '@/ui/form';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps;

export const SpecializationSelect: FC<Props> = (props) => {
  const {
    onChange, placeholder, invalid, value,
  } = props;
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();

  const specializations = useSpecializations();

  const specializationOptions = useMemo(
    () => getSpecializationOptions(specializations),
    [specializations],
  );

  const onSpecializationPress = useCallback(async () => {
    navigation.navigate(StackRoutes.ItemSelection, {
      items: specializationOptions,
      backRoute: StackRoutes.ProfileFilling,
      name: 'specializationId',
    });
  }, [navigation, specializationOptions]);

  const selectedSpecialization = useMemo(() => specializations.find(
    (specialization) => {
      const currentValue = value || params.specializationId;

      return specialization.id === Number(currentValue);
    },
  ), [params.specializationId, specializations, value]);

  useEffect(() => {
    onChange(params.specializationId || value);
  }, [onChange, params.specializationId, value]);

  return (
    <TouchableWithoutFeedback onPress={onSpecializationPress}>
      <View style={[styles.container, invalid && formStyles.inputError]}>
        <Text style={styles.text}>
          {selectedSpecialization?.name || placeholder }
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
