/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../utils';
import {useNavigation} from '@react-navigation/native';

const ScreenHeader = ({back, label, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      {back ? (
        <Text onPress={() => navigation.goBack()} style={styles.back}>
          ◀Back
        </Text>
      ) : (
        <View style={styles.menuWrapper}>
          <Image source={images.menu} style={styles.menu} resizeMode="cover" />
        </View>
      )}
      <Text style={styles.lable}>{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress} style={styles.infoWrapper}>
          <Image source={images.info} style={styles.info} resizeMode="cover" />
        </TouchableOpacity>
      ) : (
        <Text style={styles.back} />
      )}
    </View>
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
});
