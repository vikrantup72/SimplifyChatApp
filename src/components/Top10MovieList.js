import React, {useRef, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {MovieList, normalize, WINDOW_WIDTH} from '../utils';

const Top10MovieList = ({lable, title, onPress}) => {
  const flatListRef = useRef(null);

  const getItemLayout = (_, index) => ({
    length: 170,
    offset: (WINDOW_WIDTH / 2.5) * index,
    index,
  });

  const onMomentumScrollEnd = useCallback(event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / (WINDOW_WIDTH / 2.8));
    scrollToIndex(index);
  }, []);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 {lable}</Text>
      <FlatList
        getItemLayout={getItemLayout}
        horizontal
        ref={flatListRef}
        data={MovieList}
        bounces={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={onPress} style={styles.movieContainer}>
            <LinearGradient
              colors={[
                'transparent',
                'rgba(00, 00, 00, 0.7)',
                'rgba(00, 00, 00, 0.7)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.4}}
              style={styles.imgOverlay}>
              <View style={styles.textWrapper}>
                <Text style={styles.movieTitle}>{title + (index + 1)}</Text>
                <Text numberOfLines={2} style={styles.desc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  faucibus, arcu nec convallis euismod,
                </Text>
                <Text style={styles.date}>22/0/4/2023</Text>
              </View>
            </LinearGradient>
            <Text style={styles.favorite}>❤️</Text>

            <Image
              source={item.banner}
              style={styles.movieImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Top10MovieList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  movieContainer: {
    width: WINDOW_WIDTH / 2.5,
  },
  movieImage: {
    width: 140,
    height: normalize(150),
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
  movieTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  imgOverlay: {
    position: 'absolute',
    height: 60,
    width: 140,
    bottom: 5,
    zIndex: 999,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  favorite: {
    position: 'absolute',
    zIndex: 9999,
    color: 'red',
    right: 25,
    top: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 100,
  },
  textWrapper: {paddingHorizontal: 4, paddingTop: 4},
  desc: {
    fontSize: 9,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  date: {fontSize: 9, alignSelf: 'flex-end', color: '#fff'},
});
