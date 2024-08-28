import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListingCard from '../components/ListingCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../../redux/actions/appAction';

const Dashboard = () => {
  const {navigate} = useNavigation();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  let fetchdata = useSelector((state) => state.app);


  useEffect(() => {
    const ApiFetch = () => {
      let res = require('../../data/ApiData.json');
      setData(res);
      dispatch(fetchData(res));
    };
    ApiFetch();
  }, []);

  useEffect(() => {
    if (fetchdata?.data?.length > 0) {
      setData(fetchdata.data);
    }
  }, [fetchdata.data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <ListingCard
                data={item}
                onPress={() =>
                  navigate('DetailScreen', {name: item?.address, data: item})
                }
              />
            </View>
          );
        }}
      />
      {/* <Button title="Button" onPress={() => crashlytics().crash()} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default Dashboard;
