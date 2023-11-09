import React, {useRef, useCallback} from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';

import {MovieList, normalize, WINDOW_WIDTH} from '../utils';

const Top10MovieList = ({lable, title}) => {
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
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={({item, index}) => (
          <View style={styles.movieContainer}>
            <Image
              source={item.banner}
              style={styles.movieImage}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{title + (index + 1)}</Text>
          </View>
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
  },
  movieTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
});
