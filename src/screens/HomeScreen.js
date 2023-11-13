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
  Text,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useBottomSheet} from '../components/CustomBottomSheet';
import FeatureBanner from '../components/FeatureBanner';
import MessageFabIcon from '../components/MessageFabIcon';
import ScreenHeader from '../components/ScreenHeader';
import Top10MovieList from '../components/Top10MovieList';
import {banner, dummyText, images, WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {showBottomSheet, hideBottomSheet, BottomSheetComponent} =
    useBottomSheet();

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

  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const showBottomSheets = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      showBottomSheet();
    });
  };

  const hideBottomSheets = () => {
    Animated.timing(translateY, {
      toValue: WINDOW_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      hideBottomSheet();
    });
  };
  const randomNumber = Math.floor(Math.random() * 5);
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
            <Top10MovieList
              lable={'Hindi Movies'}
              title={'Movie'}
              onPress={showBottomSheets}
            />
            <Top10MovieList
              lable={'English Movie'}
              title={'Series'}
              onPress={showBottomSheets}
            />
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
          <Animated.View
            style={[styles.container, {transform: [{translateY}]}]}>
            <BottomSheetComponent>
              <ImageBackground
                source={banner[randomNumber]?.banner}
                style={{
                  width: '100%',
                  height: 320,
                  alignSelf: 'flex-end',
                  position: 'absolute',
                }}
                resizeMode="cover"
                borderBottomLeftRadius={70}
                blurRadius={40}
              />
              <View style={{marginLeft: 20}}>
                <ImageBackground
                  source={banner[randomNumber]?.banner}
                  style={{
                    width: '100%',
                    height: 300,
                    alignSelf: 'flex-end',

                    justifyContent: 'center',
                  }}
                  resizeMode="cover"
                  borderBottomLeftRadius={70}>
                  <Text onPress={hideBottomSheets} style={styles.back}>
                    ◀Back
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      alignSelf: 'flex-end',
                      padding: 12,
                      borderRadius: 12,
                      margin: 12,
                      justifyContent: 'space-between',
                      height: 240,
                    }}>
                    <Text style={styles.back}>❤️</Text>
                    <Text style={styles.back}>📕</Text>
                    <Text style={styles.back}>🖇️</Text>
                  </View>
                </ImageBackground>
              </View>
              <Text
                style={{
                  marginTop: 40,
                  paddingHorizontal: 20,
                  color: '#fff',
                  lineHeight: 22,
                  fontSize: 12,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                }}>
                {dummyText}
              </Text>
              <TouchableOpacity onPress={hideBottomSheets} style={styles.close}>
                <Text style={{color: 'red'}}>❌</Text>
              </TouchableOpacity>
            </BottomSheetComponent>
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    flex: 1,
  },
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
  back: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 2,
    textTransform: 'uppercase',
    width: '30%',
    paddingTop: 10,
  },
  close: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
