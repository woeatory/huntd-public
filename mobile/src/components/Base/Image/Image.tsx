import React, { FC, useMemo } from 'react';
import { Image as RNImage } from 'react-native';
import { getImageUri } from '@/controllers/image/image.utils/getImageUri';

interface Props {
  src: string;
  size?: number;
  borderRadius?: number;
}

export const Image: FC<Props> = (props) => {
  const { src, size = 24, borderRadius = 0 } = props;

  const uri = useMemo(() => getImageUri({ src, size }), [size, src]);

  return (
    <RNImage
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius,
      }}
    />
  );
};
