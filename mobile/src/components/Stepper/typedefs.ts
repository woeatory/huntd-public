import { FC } from 'react';

export type StepperCustomState = Record<string, any>;

export type StepperComponentProps = {
  next: () => void;
  saveState: (state: StepperCustomState) => void;
  getState: () => StepperCustomState;
} & Record<string, any>;

export interface StepperStep {
  id: number;
  label: string;
  Component: FC<StepperComponentProps>;
}
