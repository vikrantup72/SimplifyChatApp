import React, {useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WINDOW_HEIGHT} from '../utils';

// Custom modal hook
export const useBottomSheet = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const translateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const showBottomSheet = () => {
    setModalVisible(true);
  };

  const hideBottomSheet = () => {
    setModalVisible(false);
  };

  const BottomSheetComponent = ({children}) => {
    return (
      <LinearGradient
        colors={['#4b1380', 'purple']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.bottomWrapper}>
        {children}
      </LinearGradient>
    );
  };

  return {showBottomSheet, hideBottomSheet, BottomSheetComponent};
};

const styles = StyleSheet.create({
  bottomWrapper: {
    flex: 1,
  },
});
