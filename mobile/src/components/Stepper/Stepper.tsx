import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StepperStep, StepperCustomState } from '@/components/Stepper/typedefs';
import { StepperProgressBar } from '@/components/Stepper/components/StepperProgressBar';
import { StepperTabs } from '@/components/Stepper/components/StepperTabs';

interface Props {
  steps: StepperStep[];
  onFinish: (state: StepperCustomState) => void;
  currentStep: number;
  changeStep: (step: number) => void;
  startStep?: number;
  style?: any;
  isFirstTimeFilling?: boolean | null;
}

interface State {
  totalSteps: number;
  customState: StepperCustomState;
  action: Animatable.Animation;
  animationFinished: boolean;
}

const DEFAULT_ON_NEXT_ACTION: Animatable.Animation = 'fadeInRight';
const DEFAULT_OUT_NEXT_ACTION: Animatable.Animation = 'fadeOutLeft';
const DEFAULT_ANIMATION_DURATION = 700;

export class StepperComponent extends Component<Props, State> {
  state: State = {
    totalSteps: this.props.steps.length - 1,
    customState: {},
    action: DEFAULT_ON_NEXT_ACTION,
    animationFinished: false,
  };

  next = () => {
    const { totalSteps } = this.state;
    const { currentStep, changeStep } = this.props;

    if (currentStep === totalSteps) {
      this.props.onFinish(this.state.customState);
    } else {
      this.setState({
        action: DEFAULT_OUT_NEXT_ACTION,
        animationFinished: false,
      });

      setTimeout(() => {
        changeStep(currentStep + 1);
      }, DEFAULT_ANIMATION_DURATION);
    }
  };

  saveState = (state = {}) => {
    this.setState((prevState) => ({
      customState: { ...prevState.customState, ...state },
    }));
  };

  resetState = () => {
    this.setState({ customState: {} });
  };

  getState = () => this.state.customState;

  animationEnd = () => {
    const { animationFinished } = this.state;

    if (!animationFinished) {
      this.setState({
        action: DEFAULT_ON_NEXT_ACTION,
        animationFinished: true,
      });
    }
  };

  render() {
    const {
      steps, currentStep, changeStep, isFirstTimeFilling,
    } = this.props;
    const { action } = this.state;
    const Step = steps[currentStep].Component;

    return (
      <>
        {isFirstTimeFilling
          ? (
            <StepperProgressBar
              steps={steps}
              currentStep={currentStep}
            />
          ) : (
            <StepperTabs
              steps={steps}
              currentStep={currentStep}
              changeStep={changeStep}
            />
          )}

        <Animatable.View
          animation={action}
          onAnimationEnd={this.animationEnd}
          style={styles.container}
          duration={DEFAULT_ANIMATION_DURATION}
        >
          <Step
            next={this.next}
            saveState={this.saveState}
            resetState={this.resetState}
            getState={this.getState}
          />
        </Animatable.View>
      </>
    );
  }
}

export const Stepper = Animatable
  .createAnimatableComponent<Props>(StepperComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
