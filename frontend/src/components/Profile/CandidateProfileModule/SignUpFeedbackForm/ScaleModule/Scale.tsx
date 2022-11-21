import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import Slider from 'rc-slider';
import { SliderProps } from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import sliderStyles from '@/components/Profile/ProfilesListModule/Filters/RangeSlider.module.scss';
import styles from './Scale.module.scss';

interface Props extends SliderProps {
  className?: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>
}

export const Scale: FC<Props> = ({
  className, value, setValue,
  min, max, defaultValue, marks,
}) => {
  const { t } = useTranslation([Namespaces.ProfileFeedback]);

  return (
    <div className={cn(className, styles.container)}>

      <Slider
        onChange={(e) => setValue(e)}
        value={value}
        min={min}
        max={max}
        marks={marks}
        className={cn(sliderStyles.slider, styles.slider, 'mb-16')}
        defaultValue={defaultValue}
      />

      <div className={cn(styles.labelsBlock, typography.text, 'c-semidark-chocolate')}>
        <span role='img' aria-label='Awful'>
          {`😤 ${t(`${Namespaces.ProfileFeedback}:scale_awful`)}`}
        </span>
        <span role='img' aria-label='Wonderful'>
          {`${t(`${Namespaces.ProfileFeedback}:scale_wonderful`)} 😍`}
        </span>
      </div>
    </div>
  );
};
