import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { useEnglishLevels } from '@/controllers/candidateProfile/candidateProfile.hooks/useEnglishLevels';
import { getEnglishLevelsOptions } from '@/controllers/candidateProfile/candidateProfile.helpers/getEnglishLevelOptions';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { formStyles } from '@/ui/form';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps;

export const EnglishLevelSelect: FC<Props> = (props) => {
  const {
    onChange, placeholder, invalid, value,
  } = props;

  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();

  const { t } = useTranslation([Namespaces.Form]);

  const englishLevels = useEnglishLevels();
  const englishLevelsOptions = useMemo(
    () => getEnglishLevelsOptions(englishLevels, t),
    [englishLevels, t],
  );

  const onEnglishLevelPress = useCallback(() => {
    navigation.navigate(StackRoutes.ItemSelection, {
      items: englishLevelsOptions,
      backRoute: StackRoutes.ProfileFilling,
      name: 'englishLevelId',
    });
  }, [englishLevelsOptions, navigation]);

  useEffect(() => {
    onChange(params.englishLevelId || value);
  }, [onChange, params.englishLevelId, value]);

  const selectedLevelId = params.englishLevelId || value;

  const selectedEnglishLevel = useMemo(() => (
    englishLevelsOptions.find((englishLevel) => (
      englishLevel.value === selectedLevelId
    ))
  ), [englishLevelsOptions, selectedLevelId]);

  return (
    <TouchableWithoutFeedback onPress={onEnglishLevelPress}>
      <View style={[styles.container, invalid && formStyles.inputError]}>
        <Text style={styles.text}>
          {selectedEnglishLevel?.label || placeholder}
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
