/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FeatureBanner from '../components/FeatureBanner';
import MessageFabIcon from '../components/MessageFabIcon';
import ScreenHeader from '../components/ScreenHeader';
import Top10MovieList from '../components/Top10MovieList';
import {images, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils';

export default function HomeScreen() {
  const navigation = useNavigation();
  const bubble1Height = useRef(new Animated.Value(0)).current;
  const bubble2Height = useRef(new Animated.Value(0)).current;
  const bubble3Height = useRef(new Animated.Value(200)).current;
  const bubble4Height = useRef(new Animated.Value(170)).current;

  const bubbleAnimation = () => {
    const bubble1Config = {
      toValue: 170,
      duration: 6000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const reverseBubble1Config = {
      toValue: 0,
      duration: 12000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const bubble4Config = {
      toValue: 0,
      duration: 6000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const reverseBubble4Config = {
      toValue: 170,
      duration: 12000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const bubble3Config = {
      toValue: 0,
      duration: 6000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const reverseBubble3Config = {
      toValue: 200,
      duration: 12000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const bubble2Config = {
      toValue: 270,
      duration: 6000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    const reverseBubble2Config = {
      toValue: 0,
      duration: 12000,
      useNativeDriver: false,
      easing: Animated.linear,
    };
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bubble1Height, bubble1Config),
        Animated.timing(bubble4Height, bubble4Config),
        Animated.timing(bubble2Height, bubble2Config),
        Animated.timing(bubble3Height, bubble3Config),
      ]),
      Animated.parallel([
        Animated.timing(bubble4Height, reverseBubble4Config),
        Animated.timing(bubble3Height, reverseBubble3Config),
        Animated.timing(bubble1Height, reverseBubble1Config),
        Animated.timing(bubble2Height, reverseBubble2Config),
      ]),
    ]).start(() => {
      bubbleAnimation();
    });
  };

  useEffect(() => {
    bubbleAnimation();
  }, []);

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
          <ScrollView nestedScrollEnabled={true} style={{zIndex: 999}}>
            <FeatureBanner />
            <Top10MovieList lable={'Hindi Movies'} title={'Movie'} />
            <Top10MovieList lable={'English Movie'} title={'Series'} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreenV2')}
            style={styles.msgWrapper}>
            <MessageFabIcon version={'V2'} />
          </TouchableOpacity>
          <View
            style={{
              position: 'relative',
              zIndex: 9999,
              left: -WINDOW_WIDTH / 1.3,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatScreen')}
              style={styles.msgWrapper}>
              <MessageFabIcon version={'V1'} />
            </TouchableOpacity>
          </View>

          <Animated.View style={styles.bubble1(bubble1Height)} />
          <Animated.View style={styles.bubble2(bubble2Height)} />
          <Animated.View style={styles.bubble3(bubble3Height)} />
          <Animated.View style={styles.bubble4(bubble4Height)} />
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
  msgWrapper: {position: 'absolute', bottom: 20, right: 10, zIndex: 9999},
  bubble1: hw => ({
    width: hw,
    height: hw,
    backgroundColor: 'rgba(182, 217, 255, 0.2)',
    borderRadius: 170,
    position: 'absolute',
    bottom: WINDOW_HEIGHT / 2,
    left: -40,
    overflow: 'hidden',
  }),
  bubble2: hw => ({
    width: hw,
    height: hw,
    backgroundColor: 'rgba(182, 217, 255, 0.2)',
    borderRadius: 270,
    position: 'absolute',
    bottom: 140,
    right: -100,
  }),
  bubble3: hw => ({
    width: hw,
    height: hw,
    backgroundColor: 'rgba(182, 217, 255, 0.2)',
    borderRadius: 200,
    position: 'absolute',
    bottom: -40,
    left: -20,
  }),
  bubble4: hw => ({
    position: 'absolute',
    width: hw,
    height: hw,
    backgroundColor: 'rgba(182, 217, 255, 0.2)',
    borderRadius: 120,
    top: -40,
    right: -15,
  }),
});
