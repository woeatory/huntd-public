import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { StepperStep } from '@/components/Stepper/typedefs';
import { Colors } from '@/ui/theme/colors';
import { StepperTab } from '@/components/Stepper/components/StepperTabs/StepperTab';

interface Props {
  steps: StepperStep[];
  currentStep: number;
  changeStep: (step: number) => void;
}

export const StepperTabs: FC<Props> = (props) => {
  const { steps, currentStep, changeStep } = props;

  return (
    <View style={styles.container}>
      {steps.map((step, i) => {
        const isActiveStep = i === currentStep;

        return (
          <StepperTab
            key={step.id}
            label={step.label}
            isActiveStep={isActiveStep}
            changeStep={changeStep}
            step={i}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 24,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
});
