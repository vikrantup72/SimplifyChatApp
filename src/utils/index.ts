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

export const drawerItemList = [
  {id: 1, icon: require('../images/banner1.jpeg'), lable: 'Home'},
  {id: 2, icon: require('../images/banner2.jpeg'), lable: 'Profile'},
  {
    id: 3,
    icon: require('../images/banner3.jpeg'),
    lable: 'Terms and Condition',
  },
  {id: 4, icon: require('../images/banner4.jpg'), lable: 'Privacy Policy'},
];

export const dummyText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, arcu nec convallis euismod, elit turpis auctor ex, in scelerisque libero tellus at mauris. Vivamus bibendum augue in enim bibendum, ut tincidunt neque tincidunt. Nunc nec lacinia elit. Aliquam eu aliquet velit, vitae eleifend tellus. Sed fermentum risus ut finibus fringilla. Nam et nunc eu massa suscipit sollicitudin. Sed vestibulum, urna quis facilisis fringilla, augue augue finibus elit, ut venenatis velit tortor sit amet ex. Sed id velit vel velit volutpat volutpat. Integer rhoncus nulla vel lacus bibendum, non varius dolor suscipit. Vivamus luctus ante vel dui facilisis, at vestibulum sem bibendum. Etiam eu rhoncus odio. Integer vel odio nec mi imperdiet fringilla. Curabitur eget fermentum enim.';
