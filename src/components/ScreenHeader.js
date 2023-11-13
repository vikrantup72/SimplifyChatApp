/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {images} from '../utils';
import {useNavigation} from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';

const ScreenHeader = ({back, label, onPress}) => {
  const navigation = useNavigation();
  const [isDrawer, setIsDrawer] = useState(false);
  const translateX = useRef(new Animated.Value(-240)).current;

  const openDrawer = () => {
    const toValue = isDrawer ? -240 : 0;
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (!isDrawer) {
        setIsDrawer(true);
      }
    });
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -440,
      duration: 600,
      useNativeDriver: false,
    }).start(() => {
      setIsDrawer(false);
    });
  };

  return (
    <>
      <View style={styles.headerWrapper}>
        {back ? (
          <Text onPress={() => navigation.goBack()} style={styles.back}>
            ◀Back
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsDrawer(true);
              openDrawer();
            }}
            style={styles.menuWrapper}>
            <Image
              source={images.menu}
              style={styles.menu}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.lable}>{label}</Text>
        {onPress ? (
          <TouchableOpacity onPress={onPress} style={styles.infoWrapper}>
            <Image
              source={images.info}
              style={styles.info}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Text style={styles.back} />
        )}
      </View>

      {isDrawer && (
        <Animated.View
          style={[styles.drawerWrapper, {transform: [{translateX}]}]}>
          <TouchableOpacity onPress={closeDrawer} style={styles.overlay} />
          <Animated.View
            style={[styles.drawerContain, {transform: [{translateX}]}]}>
            <CustomDrawer closeDrawer={closeDrawer} />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#4b1380',
  },
  back: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 2,
    textTransform: 'uppercase',
    width: '30%',
    paddingLeft: 10,
  },
  info: {
    alignSelf: 'flex-end',
    width: 26,
    height: 26,
    tintColor: 'yellow',
  },
  infoWrapper: {width: '30%', paddingRight: 10},
  lable: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 2,
    textTransform: 'uppercase',
    width: '30%',
    textAlign: 'center',
  },
  menu: {
    tintColor: '#fff',
  },
  menuWrapper: {
    width: '30%',
    paddingLeft: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  drawerWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999999,
  },
  drawerContain: {
    width: 280,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 99999,
  },
});
