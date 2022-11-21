import React, { FC } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { imageLoader } from '@/controllers/image/image.utils/imageLoader';

export const Image: FC<ImageProps> = (props) => (
  <NextImage
    {...props}
    loader={imageLoader}
  />
);
