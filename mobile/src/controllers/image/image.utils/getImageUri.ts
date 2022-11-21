import Config from 'react-native-config';

interface GetImageUriOptions {
  src: string;
  size: number;
}

interface GetImageUri {
  (options: GetImageUriOptions): string;
}

export const getImageUri: GetImageUri = ({ src, size }) => {
  const url = src.split('/').slice(3).join('/');
  const imageSize = size * 2;

  return `${Config.IMAGE_HANDLER_ENDPOINT}/fit-in/${imageSize}x${imageSize}/${url}`;
};
