import React, {
  FC, useCallback, useState, useMemo, useEffect,
} from 'react';
import {
  Text, View, StyleSheet, SafeAreaView,
  TouchableWithoutFeedback, FlatList, TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import debounce from 'debounce-promise';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GlobalStyles } from '@/ui/theme/globalStyles';
import { normalize } from '@/ui/theme/normalize';
import { BackButton } from '@/components/Header/BackButton';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { Colors } from '@/ui/theme/colors';
import { StackRoutes, StackRoutesParamList } from '@/controllers/router/router.constants';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { useTechnologies } from '@/controllers/candidateProfile/candidateProfile.hooks/useTechnologies';
import { getTechnologiesOptions } from '@/controllers/candidateProfile/candidateProfile.helpers/getTechnologiesOptions';
import { useTechnologiesQuery, useCreateTechnologyMutation } from '@/controllers/graphql/generated';
import { SelectOption } from '@/controllers/form/form.constants';
import { TechnologyItem } from '@/components/Actions/MultiItemsSelection/TechnologyItem';
import { SearchIcon } from '@/ui/icons/general/SearchIcon';

type RouteProps = RouteProp<
  StackRoutesParamList,
  StackRoutes.TechnologiesSelection
>;

export const TechnologiesSelectionScreen: FC = () => {
  const { t } = useTranslation([Namespaces.Profile]);

  const { params } = useRoute<RouteProps>();

  const [
    selectedTechnologies,
    setSelectedTechnologies,
  ] = useState<Array<number>>(params.selectedIds);

  const selectedIds = useMemo(
    () => new Set(selectedTechnologies),
    [selectedTechnologies],
  );

  const [query, setQuery] = useState<string>('');
  const [isNoTechnology, setIsNoTechnology] = useState<boolean>(false);

  const [
    technologies,
    setTechnologies,
  ] = useState<Array<SelectOption>>(
    getTechnologiesOptions(useTechnologies(selectedTechnologies)),
  );

  useEffect(() => {
    if (query.length) {
      setIsNoTechnology(
        !technologies.some((technology) => technology.label.includes(query)),
      );
    }

  }, [query, technologies]);

  const navigation = useNavigation();

  const { refetch: refetchTechnologies } = useTechnologiesQuery({
    variables: {
      requiredTechnologiesIds: selectedTechnologies,
    },
  });

  const [createTechnology] = useCreateTechnologyMutation({
    optimisticResponse: ({ name }) => ({
      createTechnology: {
        id: -1,
        name,
      },
    }),
  });

  const handleChange = debounce(
    async (text: string) => {
      const { data: refetchedData } = await refetchTechnologies({
        query: text,
      });

      setQuery(text);

      setTechnologies(getTechnologiesOptions(refetchedData.technologies || []));
    }, 500,
  );

  const createOption = async (name: string) => {
    const { data } = await createTechnology({
      variables: {
        name,
      },
    });

    addItem(data?.createTechnology.id);

    const [option] = getTechnologiesOptions(
      data?.createTechnology ? [data.createTechnology] : [],
    );

    if (option) {
      setTechnologies([...technologies, option]);
    }

    await handleChange('');

    return option;
  };

  const onFinish = useCallback(() => {
    navigation.navigate(params.backRoute, {
      technologiesIds: selectedTechnologies.join(','),
    });
  }, [params.backRoute, selectedTechnologies, navigation]);

  const addItem = useCallback((technology) => {
    setSelectedTechnologies((prevTechnologies) => (
      [...prevTechnologies, technology]));
  }, []);

  const removeItem = useCallback((technology) => {
    setSelectedTechnologies((prevTechnologies) => (
      prevTechnologies.filter((el) => el !== technology)));
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TechnologyItem
      item={item}
      addItem={addItem}
      removeItem={removeItem}
      checked={selectedIds.has(Number(item.value))}
    />
  ), [addItem, removeItem, selectedIds]);

  const isHintShown = !!technologies.length && !query.length;

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
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={t(`${Namespaces.Profile}:search_technologies`)}
            placeholderTextColor={Colors.Gray}
            onChangeText={handleChange}
            style={styles.searchInput}
          />
          <SearchIcon color={Colors.Gray} />
        </View>
        {isHintShown && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              {t(`${Namespaces.Profile}:most_popular_technologies`)}
            </Text>
          </View>
        )}
        <FlatList
          data={technologies}
          keyExtractor={(technology) => technology.value}
          renderItem={renderItem}
          style={styles.list}
        />
        {isNoTechnology && (
          <TouchableWithoutFeedback onPress={() => createOption(query)}>
            <Text style={styles.createHint}>
              {t(`${Namespaces.Profile}:create "${query}"`)}
            </Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(16),
  },
  header: {
    paddingVertical: normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    ...typography.mediumText,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    marginBottom: 24,
    paddingVertical: 2,
  },
  actionText: {
    ...typography.mediumText,
  },
  hintText: {
    ...typography.smallCaption,
    textTransform: 'uppercase',
    color: Colors.Gray,
  },
  hintContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    paddingBottom: 8,
  },
  createHint: {
    paddingVertical: 8,
  },
  list: {
    flexGrow: 0,
  },
});
