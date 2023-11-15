import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const useBottomSheet = () => {
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

  return {BottomSheetComponent};
};

const styles = StyleSheet.create({
  bottomWrapper: {
    flex: 1,
  },
});
