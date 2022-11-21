import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StepperStep } from '@/components/Stepper/typedefs';
import { StepperIcon } from '@/components/Stepper/components/StepperProgressBar/StepperIcon';
import { Colors } from '@/ui/theme/colors';

interface Props {
  steps: StepperStep[];
  currentStep: number;
}

export const StepperProgressBar: FC<Props> = (props) => {
  const { steps, currentStep } = props;

  const gradientWidth = useMemo(
    () => (100 / (steps.length - 1)) * currentStep,
    [currentStep, steps.length],
  );
  const gradientColors = [Colors.Citrus, Colors.Sky];

  return (
    <View style={styles.container}>
      <View style={[
        styles.stepperLine,
        styles.stepperLineGradient,
        { width: `${gradientWidth}%` },
      ]}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientContainer}
          start={[0, 1]}
          end={[1, 0]}
        />
      </View>
      <View style={[
        styles.stepperLine,
        styles.stepperLineWhite,
        { width: `${100 - gradientWidth}%` }]}
      />

      {steps.map((step, i) => {
        const isCompleteStep = i < currentStep;
        const isActiveStep = i === currentStep;

        return (
          <StepperIcon
            key={step.id}
            label={step.label}
            isFirstStep={i === 0}
            isLastStep={i === steps.length - 1}
            isCompletedStep={isCompleteStep}
            isActiveStep={isActiveStep}
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
  },
  gradientContainer: {
    width: '100%',
    height: 6,
  },
  stepperLine: {
    position: 'absolute',
    zIndex: -100,
    top: '20%',
    height: 6,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.LightGray,
    borderRadius: 2,
  },
  stepperLineGradient: {
    left: 0,
    borderWidth: 0,
  },
  stepperLineWhite: {
    right: 0,
    backgroundColor: Colors.White,
  },
});
