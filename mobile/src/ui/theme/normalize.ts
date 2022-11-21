import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// based on iPhone 8's scale
const widthScale: number = width / 375;
const heightScale: number = height / 667;

export function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
) {
  const newSize = based === 'height' ? size * heightScale : size * widthScale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
