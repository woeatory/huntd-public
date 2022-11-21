import React, { FC } from 'react';
import {
  Text, View, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';

interface Props {
  label: string;
  isActiveStep: boolean;
  changeStep: (step: number) => void;
  step: number;
}

export const StepperTab: FC<Props> = (props) => {
  const {
    label,
    step,
    isActiveStep,
    changeStep,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <TouchableWithoutFeedback onPress={() => changeStep(step)}>
      <View style={[styles.tabContainer, isActiveStep && styles.activeTab]}>
        <Text style={[styles.tabText, isActiveStep && styles.activeTabText]}>
          {t(`${Namespaces.Profile}:${label}`)}
        </Text>
      </View>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingBottom: 8,
  },
  tabText: {
    ...typography.smallText,
    color: Colors.Semidark,
    textTransform: 'uppercase',
  },
  activeTabText: {
    ...typography.smallCaption,
    color: Colors.Citrus,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.Citrus,
    color: Colors.Citrus,
  },
});
