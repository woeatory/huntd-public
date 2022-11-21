import React, { FC } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import cn from 'classnames';
import { SliderProps } from 'rc-slider/lib/Slider';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';
import sliderStyles from '@/components/Profile/ProfilesListModule/Filters/RangeSlider.module.scss';

interface Props extends SliderProps {
  handleSliderChange: (value: number) => void;
}

export const SingleSliderUi: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <Slider
      {...rest}
      className={cn(sliderStyles.slider, className)}
      onChange={props.handleSliderChange}
    />
  );
};

export const SingleSlider = withHookFormController({})(
  SingleSliderUi,
);
