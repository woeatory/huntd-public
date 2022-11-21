import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { useTechnologies } from '@/controllers/candidateProfile/candidateProfile.hooks/useTechnologies';
import { formStyles } from '@/ui/form';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { CloseIcon } from '@/ui/icons/general/CloseIcon';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ChevronRight } from '@/ui/icons/general/ChevronRight';

type RouteProps = RouteProp<StackRoutesParamList, StackRoutes.ProfileFilling>;
type Props = RenderInputProps;

export const TechnologiesSelect: FC<Props> = (props) => {
  const { onChange, invalid } = props;

  const { t } = useTranslation([Namespaces.Form]);

  const [profile] = useLatestCandidateProfile();

  const [
    profileTechnologies,
    setProfileTechnologies,
  ] = useState<Set<number>>(
    new Set(profile?.technologies?.map((el) => +el.id)),
  );

  const { params } = useRoute<RouteProps>();

  useEffect(() => {
    if (params?.technologiesIds?.split('')) {
      const updatedTechnologies = params?.technologiesIds?.split(',')
        .filter(Boolean)
        .reduce((acc, cur) => acc.add(+cur), new Set<number>());

      setProfileTechnologies(new Set(updatedTechnologies));
    }
  }, [params.technologiesIds]);

  const navigation = useNavigation();

  const selectedIds = useMemo(
    () => [...profileTechnologies],
    [profileTechnologies],
  );

  const technologies = useTechnologies(selectedIds);

  const onPress = useCallback(() => {
    navigation.navigate(StackRoutes.TechnologiesSelection, {
      backRoute: StackRoutes.ProfileFilling,
      selectedIds,
    });
  }, [navigation, selectedIds]);

  const removeItem = useCallback((technologyId: number) => {
    setProfileTechnologies(
      ((prevTechnologies) => new Set(
        [...prevTechnologies].filter(
          (technology) => technology !== technologyId,
        ),
      )),
    );
  }, []);

  useEffect(() => {
    if (selectedIds.length) {
      onChange(selectedIds);
    } else {
      onChange('');
    }
  }, [onChange, params.technologiesIds, selectedIds]);

  const selectedTechnologies = useMemo(() => {
    const technologiesMap = technologies.reduce(
      (accumulator, current) => accumulator.set(+current.id, current.name),
      new Map(),
    );

    if (selectedIds) {
      return selectedIds.map(
        (technologyId) => ({
          name: technologiesMap.get(+technologyId),
          id: +technologyId,
        }),
      );
    }

    return [];
  }, [selectedIds, technologies]);

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, invalid && formStyles.inputError]}>
          <Text
            style={[styles.text, !!params.technologiesIds && styles.filled]}
          >
            {t(`${Namespaces.Form}:technologies_placeholder`)}
          </Text>
          <ChevronRight color={Colors.Gray} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.selected}>
        {selectedTechnologies?.map((technology) => (
          <TouchableWithoutFeedback
            onPress={() => removeItem(technology.id)}
            key={technology.id}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>{technology.name}</Text>
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
