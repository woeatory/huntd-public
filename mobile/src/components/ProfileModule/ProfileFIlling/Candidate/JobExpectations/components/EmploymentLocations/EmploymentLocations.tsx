import React, {
  Dispatch,
  FC, SetStateAction,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { Checkbox } from '@/components/Base/Checkbox';
import { RenderInputProps } from '@/components/FormElements/FormField';
import { EmploymentLocations } from '@/controllers/profile/profile.typedefs';
import { EmploymentLocationBaseFragment, useEmploymentLocationsQuery } from '@/controllers/graphql/generated';

export const getEmploymentLocationsOptions = (
  employmentLocations: EmploymentLocationBaseFragment[],
) => employmentLocations.map((employmentLocation) => ({
  label: employmentLocation.slug,
  value: `${employmentLocation.id}`,
}));

type Props = RenderInputProps & {
  setIsOffice: Dispatch<SetStateAction<boolean>>;
  initialValues?: number[];
};

export const EmploymentLocationsInput: FC<Props> = (props) => {
  const {
    onChange, setIsOffice, initialValues,
  } = props;

  const [
    selectedOptions,
    setSelectedOptions,
  ] = useState(new Set<number>(initialValues));

  const employmentLocationsQueryResult = useEmploymentLocationsQuery();

  const employmentLocations = useMemo(
    () => employmentLocationsQueryResult.data?.employmentLocations ?? [],
    [employmentLocationsQueryResult],
  );

  const employmentLocationsOptions = useMemo(
    () => getEmploymentLocationsOptions(employmentLocations)
      .sort((a, b) => (+b.value) - (+a.value)),
    [employmentLocations],
  );

  const handleCheck = useCallback((id: number, slug: string) => {
    if (selectedOptions.has(id)) {
      setSelectedOptions(((prevState) => new Set(
        [...prevState].filter((el) => el !== id),
      )));
    } else {
      setSelectedOptions(((prevState) => new Set([...prevState, id])));
    }

    if (slug === EmploymentLocations.Office) {
      setIsOffice(!selectedOptions.has(id));
    }
  }, [selectedOptions, setIsOffice]);

  useEffect(() => {
    onChange([...selectedOptions]);
  }, [onChange, selectedOptions]);

  return (
    <View style={styles.container}>
      {employmentLocationsOptions.map((option) => (
        <TouchableWithoutFeedback
          onPress={() => handleCheck(+option.value, option.label)}
          key={option.value}
        >
          <View style={styles.checkbox}>
            <Checkbox checked={selectedOptions.has(+option.value)} />
            <Text style={styles.label}>{option.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 8,
    textTransform: 'capitalize',
  },
});
