/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FeatureBanner from '../components/FeatureBanner';
import ScreenHeader from '../components/ScreenHeader';
import {images, WINDOW_HEIGHT} from '../utils';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar animated={true} backgroundColor={'#4b1380'} />
      <SafeAreaView style={styles.activityWrapper}>
        <LinearGradient
          colors={['#4b1380', 'purple']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}>
          <ScreenHeader label={'Home'} back={false} />
          <FeatureBanner />
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={styles.msgWrapper}>
            <Image source={images.msgFab} style={{width: 45, height: 44}} />
          </TouchableOpacity>
          <View style={styles.bubble1} />
          <View style={styles.bubble2} />
          <View style={styles.bubble3} />
          <View style={styles.bubble4} />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  activityWrapper: {
    flex: 1,
    backgroundColor: '#0B0014',
  },
  msgWrapper: {position: 'absolute', bottom: 20, right: 10},
  bubble1: {
    width: 170,
    height: 170,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 170,
    position: 'absolute',
    bottom: WINDOW_HEIGHT / 2,
    left: -40,
  },
  bubble2: {
    width: 270,
    height: 270,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 270,
    position: 'absolute',
    bottom: 140,
    right: -100,
  },
  bubble3: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 200,
    position: 'absolute',
    bottom: -40,
  },
  bubble4: {
    position: 'absolute',
    width: 170,
    height: 170,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 120,
    top: -40,
    right: 0,
  },
});
