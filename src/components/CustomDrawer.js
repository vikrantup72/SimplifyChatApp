import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {banner, drawerItemList} from '../utils';

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
      <LinearGradient
        colors={['#fff', 'transparent']}
        start={{x: 1.5, y: 1.5}}
        end={{x: 0.1, y: 0.5}}
        style={{width: '100%', height: 1}}
      />
      <View style={{marginTop: 40}}>
        <FlatList
          data={drawerItemList}
          scrollEnabled={false}
          ItemSeparatorComponent={
            <LinearGradient
              colors={['#fff', 'transparent']}
              start={{x: 1.5, y: 1}}
              end={{x: 0.3, y: 0}}
              style={{width: '100%', height: 1}}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => closeDrawer()}>
              <Image source={item.icon} style={styles.icon} />

              <Text style={styles.lableText}>{item.lable}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.logout} onPress={() => closeDrawer()}>
        <Image source={banner[3].banner} style={styles.icon} />

        <Text style={styles.lableText}>{'Logout'}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
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
  lableText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {width: 24, height: 24, borderRadius: 4, marginRight: 12},
  logout: {
    position: 'absolute',
    bottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawer;
