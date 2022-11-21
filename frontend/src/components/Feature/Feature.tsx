import { FC } from 'react';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';

interface Props {
  name: string;
  oldFeature: JSX.Element | null;
  newFeature: JSX.Element | null;
}

export const Feature: FC<Props> = (props) => {
  const {
    name,
    oldFeature,
    newFeature,
  } = props;

  const feature = useFeature(name);

  return feature.isEnabled()
    ? newFeature
    : oldFeature;
};
