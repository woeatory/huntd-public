import React, { FC } from 'react';
import 'rc-slider/assets/index.css';
import { Range } from 'rc-slider';
import cn from 'classnames';
import { RangeProps } from 'rc-slider/lib/Range';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';
import styles from './RangeSlider.module.scss';

interface Props extends RangeProps {
  handleSliderChange: (values: number[]) => void;
}

export const RangeSliderUi: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <Range
      {...rest}
      className={cn(styles.slider, className)}
      onChange={props.handleSliderChange}
    />
  );
};

export const RangeSlider = withHookFormController({})(
  RangeSliderUi,
);
