import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {images} from '../utils';

const MessageFabIcon = () => {
  const buttonHeight = useRef(new Animated.Value(44)).current;

  const animateButton = () => {
    const animationConfig = {
      toValue: 60, // Change the target height as needed
      duration: 600, // Animation duration in milliseconds
      useNativeDriver: false,
    };

    const reverseConfig = {
      toValue: 44,
      duration: 1200,
      useNativeDriver: false,
    };

    Animated.sequence([
      Animated.timing(buttonHeight, animationConfig),
      Animated.timing(buttonHeight, reverseConfig),
    ]).start(animateButton); // Start the animation again when it completes
  };

  useEffect(() => {
    animateButton(); // Start the animation when the component mounts
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: buttonHeight + 6,
          width: buttonHeight + 6,
        },
      ]}>
      <Animated.Image
        source={images.msgFab}
        style={[{height: buttonHeight, width: buttonHeight}]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', padding: 4, borderRadius: 100},
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MessageFabIcon;
