import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListingCard from '../components/ListingCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../../redux/actions/appAction';
import MovieListingCard from '../components/MovieListingCard';
import {DEVICE_WINDOW_WIDTH} from '../../utils/config';
import {disLikeMovies, likeMovies} from '../../redux/actions';

const Dashboard = () => {
  const {navigate} = useNavigation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  let fetchdata = useSelector((state) => state.app);

  const ApiFetch = async () => {
    let res = await fetch('https://ww4.yts.nz/api/v2/list_movies.json')
      .then((response) => response.json())
      .then((json) => {
        console.log('json==>', json?.data?.movies?.[0]);
        let data = [];
        if (json?.data?.movies.length > 0) {
          data = json?.data?.movies?.map((item, index) => {
            return (item = {...item, like: false});
          });
        }
        // console.log('asdd==>', data?.[0]);

        setData(data);
      })
      .catch((error) => {
        console.error('error==>', error);
      });
    // setData(res);
    // dispatch(fetchData(res));
  };

  useEffect(() => {
    ApiFetch();
  }, []);

  useEffect(() => {
    if (fetchdata?.data?.length > 0) {
      setData(fetchdata.data);
    }
  }, [fetchdata.data]);

  const likeFn = (item) => {
    let filtered = data?.map((e, index) =>
      e?.id == item?.id ? {...e, like: !item.like} : e,
    );
    if (item?.like == true) {
      dispatch(disLikeMovies(item));
    } else {
      dispatch(likeMovies(item));
    }
    // console.log(' like--->', filtered?.[0]);
    // datas[item?.id] = {...datas[item?.id], like: !datas.like};
    setData(filtered);
  };

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
                    navigate('MoviesScreen', {name: item?.title, data: item})
                  }
                  onLike={() => likeFn(item)}
                />
              </View>
            );
          }}
        />
      </View>
      {/* <Button title="Button" onPress={() => crashlytics().crash()} /> */}
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

export default Dashboard;
