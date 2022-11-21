import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { useJobExperiences } from '@/controllers/candidateProfile/candidateProfile.hooks/useJobExperiences';
import { getJobExperiencesOptions } from '@/controllers/candidateProfile/candidateProfile.helpers/getJobExperiencesOptions';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { formStyles } from '@/ui/form';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps;

export const JobExperienceSelect: FC<Props> = (props) => {
  const {
    onChange, placeholder, invalid, value,
  } = props;

  const { t } = useTranslation([Namespaces.Form]);
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();

  const jobExperiences = useJobExperiences();
  const jobExperiencesOptions = useMemo(
    () => getJobExperiencesOptions(jobExperiences, t),
    [jobExperiences, t],
  );

  const onJobExperiencesPress = useCallback(() => {
    navigation.navigate(StackRoutes.ItemSelection, {
      items: jobExperiencesOptions,
      backRoute: StackRoutes.ProfileFilling,
      name: 'jobExperienceId',
    });
  }, [jobExperiencesOptions, navigation]);

  const selectedId = params.jobExperienceId || value;

  useEffect(() => {
    onChange(params.jobExperienceId || value);
  }, [onChange, params.jobExperienceId, value]);

  const selectedJobExperience = useMemo(() => (
    jobExperiencesOptions.find((jobExperience) => (
      jobExperience.value === selectedId
    ))
  ), [jobExperiencesOptions, selectedId]);

  return (
    <TouchableWithoutFeedback onPress={onJobExperiencesPress}>
      <View style={[styles.container, invalid && formStyles.inputError]}>
        <Text style={styles.text}>
          {selectedJobExperience?.label || placeholder}
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
