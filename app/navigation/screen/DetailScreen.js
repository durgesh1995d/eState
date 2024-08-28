import {View, Text, StyleSheet, Image, Platform, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils';
import Button from '../components/Button';
import * as Notifications from 'expo-notifications';
import {Home_latitude, Home_longitude} from '../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../../redux/actions/appAction';
import {useNavigation} from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DetailScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [data, setData] = useState('');
  const [canUnlock, setCanUnlock] = useState(false);

  // Redux Data
  let fetchdata = useSelector((state) => state.app.data);

  //Schedule notifications function
  async function schedulePushNotification(data, tpye) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: data,
        body: tpye ? 'matching home' : 'Unblocked ',
        subtitle: 'fff',
        data: {data: 'goes here', test: {test1: 'more data'}},
      },
      trigger: null,
    });
  }

  useEffect(() => {
    setData(props.route.params?.data);
    if (props.route.params?.data?.latitude) {
      const distance = calculateDistance(
        props.route.params?.data?.latitude,
        props.route.params?.data?.longitude,
        Home_latitude,
        Home_longitude,
      );
      setCanUnlock(distance <= 30);
      if (distance <= 30) {
        schedulePushNotification(
          `you 30 meter Range of Address: 
            ${props.route.params?.data?.address}`,
          true,
        );
      }
    }
  }, [props.route.params?.data]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };

  const handleUnlock = async () => {
    let scheduleData = `Unlocked ${data.address}`;
    await schedulePushNotification(scheduleData);
    fetchdata[data.id - 1] = {...fetchdata[data.id - 1], unBlock: true};
    dispatch(fetchData(fetchdata));
    setTimeout(() => {
      alert('Home unlocked successfully!');
    }, 1000);
    navigation.navigate('Dashboards');
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: data?.image}} style={styles.image} />
      <View style={styles.rowView}>
        <Text style={styles.headerText}>Address</Text>
        <Text style={styles.detailText}>{data?.address}</Text>
      </View>
      <View style={[styles.rowView, {flexDirection: 'column'}]}>
        <Text style={styles.headerText}>Description</Text>
        <Text style={styles.detailText}>{data?.description}</Text>
      </View>
      {canUnlock && data.unBlock == false && (
        <Button title="UnBlock" onPress={handleUnlock} />
      )}
      {data.unBlock && <Text style={styles.textstatus}> Already Unblock</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  image: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 250,
    marginBottom: 20,
  },
  rowView: {
    borderBottomWidth: 1,
    padding: 15,
    justifyContent: 'space-between',
    borderColor: theme.colors.LIGHT_GRAY,
  },
  headerText: {
    fontSize: theme.FONT_SIZES.headH4,
    fontWeight: 'bold',
    color: theme.colors.TEXT_TITLE,
  },
  detailText: {
    fontSize: theme.FONT_SIZES.headH5,
    color: theme.colors.TEXT_LABEL,
  },
  textstatus: {
    color: theme.colors.PRIMARY_TEXT_COLOR,
    fontSize: theme.FONT_SIZES.headH4,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default DetailScreen;
