/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {banner, normalize, WINDOW_WIDTH} from '../utils';

const FeaturedBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    let nextIndex = (currentIndex + 1) % banner.length; // Calculate the next index in a circular manner

    const scrollInterval = setInterval(() => {
      if (nextIndex < banner.length) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
        nextIndex = (nextIndex + 1) % banner.length; // Calculate the next index for the next iteration
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [currentIndex, banner.length]);

  const getItemLayout = (data, index) => ({
    length: WINDOW_WIDTH, // Width of each item
    offset: WINDOW_WIDTH * index, // Offset of the item within the list
    index,
  });

  const handleMomentumScrollEnd = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / WINDOW_WIDTH); // Assuming 'width' is defined
    setCurrentIndex(newIndex);
  };

  return (
    <View style={{marginTop: 20, zIndex: 999}}>
      <FlatList
        nestedScrollEnabled={true}
        getItemLayout={getItemLayout}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: 'purple',
              height: normalize(210),
              width: normalize(WINDOW_WIDTH / 1.4 + 5),
              borderRadius: normalize(15),
              marginHorizontal: normalize(20),
            }}
          />
        }
        horizontal
        pagingEnabled
        ref={flatListRef}
        data={banner}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={({item, index}) => (
          <View style={styles.child}>
            <View
              style={{overflow: 'hidden', width: '90%', alignSelf: 'center'}}>
              <View
                style={{
                  borderRadius: normalize(16),
                  overflow: 'hidden',
                }}>
                <Image
                  source={item.banner}
                  style={[styles.image(WINDOW_WIDTH, 160)]}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: normalize(20),
          marginLeft: normalize(0),
        }}>
        {banner?.slice(0, 5).map((_, i) => (
          <View
            key={i?.toString()}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 5,
              backgroundColor: currentIndex === i ? '#fff' : 'gray',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(FeaturedBanner);

const styles = StyleSheet.create({
  child: {width: WINDOW_WIDTH},
  pagination_style: {
    position: 'absolute',
    bottom: normalize(-25),
    alignSelf: 'center',
  },

  image: (width, height) => ({
    width: normalize(width),
    height: normalize(height),
    justifyContent: 'center',
  }),

  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Customize the dot color
  },
});
