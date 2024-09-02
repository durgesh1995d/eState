import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MovieListingCard from '../components/MovieListingCard';
import {useSelector} from 'react-redux';

const Likes = () => {
  const [data, setData] = useState([]);
  let movies = useSelector((state) => state.movies);
  useEffect(() => {
    console.log('ReduceData==>', movies?.likeMoviesData);
    setData(movies?.likeMoviesData);
  }, [movies]);
  return (
    <View style={styles.container}>
      <View style={styles.cardStyle}>
        <FlatList
          data={data}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={2}
          keyExtractor={(item, index) => item.id + '-' + index}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={
                  {
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // flex: 1,
                  }
                }>
                <MovieListingCard
                  data={item}
                  onPress={() =>
                    navigate('DetailScreen', {name: item?.address, data: item})
                  }
                  //   onLike={() => likeFn(item)}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  cardStyle: {
    // width: DEVICE_WINDOW_WIDTH - 40,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
});

export default Likes;
