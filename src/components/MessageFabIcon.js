import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {images} from '../utils';

const MessageFabIcon = () => {
  const buttonHeight = useRef(new Animated.Value(44)).current;
  const buttonRotate = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(100)).current; // Initial position above the screen

  const animateButton = () => {
    const animationConfig = {
      toValue: 60,
      duration: 600,
      useNativeDriver: false,
    };

    const reverseConfig = {
      toValue: 44,
      duration: 600,
      useNativeDriver: false,
    };

    const rotateConfig = {
      toValue: 360,
      duration: 600,
      useNativeDriver: false,
    };

    const translateYConfig = {
      toValue: 0, // Move to the bottom
      duration: 1200,
      useNativeDriver: false,
    };

    Animated.sequence([
      Animated.timing(translateY, translateYConfig),

      Animated.parallel([
        Animated.timing(buttonHeight, animationConfig),
        Animated.timing(buttonRotate, rotateConfig),
      ]),
      Animated.timing(buttonHeight, reverseConfig),
    ]).start(() => {
      buttonRotate.setValue(0);
      animateButton();
    });
  };

  useEffect(() => {
    animateButton();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: buttonHeight + 6,
          width: buttonHeight + 6,
          transform: [{translateY}],
        },
      ]}>
      <Animated.Image
        source={images.msgFab}
        style={{
          height: buttonHeight,
          width: buttonHeight,
          transform: [
            {
              rotate: buttonRotate.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', padding: 4, borderRadius: 200},
  button: {backgroundColor: '#3498db', padding: 15, borderRadius: 8},
  buttonText: {color: '#fff', fontSize: 16, textAlign: 'center'},
});

export default MessageFabIcon;
