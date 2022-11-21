import React from 'react';
import cn from 'classnames';
import styles from '@/components/Profile/StepperModule/StepperModule.module.scss';
import { Tabs } from '@/components/Profile/StepperModule/Tabs/Tabs';
import { Stepper } from '@/components/Profile/StepperModule/Stepper/Stepper';

interface Props {
  currentStep: number;
  isFirstTimeFillingProfile: boolean;
}

export const StepperModule = ({
  currentStep,
  isFirstTimeFillingProfile,
}: Props) => (
  <div className={cn(styles.stepper)}>
    {isFirstTimeFillingProfile
      ? (
        <Stepper
          currentStep={currentStep}
          isFirstTimeFillingProfile={isFirstTimeFillingProfile}
        />
      )
      : (
        <Tabs
          currentStep={currentStep}
        />
      )}
  </div>
);
