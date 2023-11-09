import {Dimensions, PixelRatio, Platform} from 'react-native';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');
const scale = WINDOW_WIDTH / 320;
export const normalize = (size: any) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
export const images = {
  sendMsg: require('../images/sendMsg.png'),
  delivered: require('../images/deliverd.png'),
  error: require('../images/error.png'),
  msgFab: require('../images/messageFab.png'),
  info: require('../images/Info.png'),
  menu: require('../images/menu.png'),
};
export const banner = [
  {id: 1, banner: require('../images/banner1.jpeg')},
  {id: 2, banner: require('../images/banner2.jpeg')},
  {id: 3, banner: require('../images/banner3.jpeg')},
  {id: 4, banner: require('../images/banner4.jpg')},
  {id: 5, banner: require('../images/banner2.jpeg')},
];
export const MovieList = [
  {id: 1, banner: require('../images/banner1.jpeg')},
  {id: 2, banner: require('../images/banner2.jpeg')},
  {id: 3, banner: require('../images/banner3.jpeg')},
  {id: 4, banner: require('../images/banner4.jpg')},
  {id: 5, banner: require('../images/banner2.jpeg')},
  {id: 6, banner: require('../images/banner1.jpeg')},
  {id: 7, banner: require('../images/banner2.jpeg')},
  {id: 8, banner: require('../images/banner3.jpeg')},
  {id: 9, banner: require('../images/banner4.jpg')},
  {id: 10, banner: require('../images/banner2.jpeg')},
];
