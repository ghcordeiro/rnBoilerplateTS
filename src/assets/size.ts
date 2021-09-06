import { Dimensions, Platform, PixelRatio } from 'react-native';

const { height, width, fontScale } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = width / 320;

const retornaNewSize = (size: number, text = false) => {
  if (fontScale === 1) {
    return size * scale;
  }
  if (fontScale > 1) {
    return text ? size * scale - fontScale * 2.5 : size * scale - fontScale * 2;
  }
  return text ? size * scale * (fontScale + fontScale * 0.25) : size * scale * fontScale;
};

const normalize = (size: number) => {
  const newSize = retornaNewSize(size, true);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const normalizeHeight = (size: number) => {
  const newSize = retornaNewSize(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export { height, width, fontScale, normalize, normalizeHeight };
