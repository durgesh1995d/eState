import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {emptyData} from '../../redux/actions/appAction';
import {persistors} from '../../redux/store';

const More = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logOut = async () => {
    dispatch(emptyData());
    persistors.purge();
    AsyncStorage.setItem('log-in', JSON.stringify({login: false}));
    navigation.navigate('SplashScreen');
  };
  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 30,
  },
});
export default More;
