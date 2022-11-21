import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { getStepStyles, mainStyles } from '@/components/Stepper/components/StepperProgressBar/StepperIcon.styles';
import { Colors } from '@/ui/theme/colors';
import { CheckIcon } from '@/ui/icons/general/CheckIcon';

interface Props {
  label: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCompletedStep: boolean;
  isActiveStep: boolean;
}

export const StepperIcon: FC<Props> = (props) => {
  const {
    label,
    isFirstStep,
    isLastStep,
    isCompletedStep,
    isActiveStep,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const circleStyles = useMemo(
    () => getStepStyles({
      isFirstStep,
      isLastStep,
      isCompletedStep,
      isActiveStep,
    }),
    [
      isFirstStep,
      isLastStep,
      isCompletedStep,
      isActiveStep,
    ],
  );

  return (
    <View style={circleStyles.container}>
      <View style={mainStyles.row}>
        <View style={circleStyles.circle}>
          {isCompletedStep && (
            <View style={circleStyles.checkIcon}>
              <CheckIcon
                color={Colors.White}
              />
            </View>
          )}
        </View>
      </View>

      <View>
        <Text style={circleStyles.label}>
          {t(`${Namespaces.Profile}:${label}`)}
        </Text>
      </View>
    </View>
  );
};
