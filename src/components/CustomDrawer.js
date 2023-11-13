import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {banner} from '../utils';

const CustomDrawer = ({closeDrawer}) => {
  return (
    <LinearGradient
      colors={['#4b1380', 'purple', '#fff']}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.gradient}>
      <View style={styles.header}>
        <LinearGradient
          colors={['red', 'yellow']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearBorder}>
          <View style={styles.imgWrapper}>
            <Image source={banner[3].banner} style={styles.img} />
          </View>
        </LinearGradient>
        <View>
          <Text style={styles.headerText}>Vikrant Upadhyay</Text>
          <Text style={styles.headerText}>Age: 26</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => closeDrawer()}>
          <Text>Item 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => closeDrawer()}>
          <Text>Item 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => closeDrawer()}>
          <Text>Item 3</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    width: 240,
  },
  header: {
    marginVertical: 10,
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b1380',
    paddingLeft: 10,
  },
  drawerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  imgWrapper: {
    backgroundColor: '#fff',
    width: 68,
    height: 68,
    borderRadius: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearBorder: {
    width: 75,
    height: 75,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 68, height: 68, borderRadius: 68},
});

export default CustomDrawer;
