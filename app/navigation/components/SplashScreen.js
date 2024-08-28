import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SplashSreen = () => {
  const navigation = useNavigation();
  const [islogin, setIslogin] = useState(false);

  const loginFn = async () => {
    let data = await AsyncStorage.getItem('log-in');
    let dataj = data && JSON.parse(data);
    setIslogin(dataj?.login);
    if (dataj?.login) {
      navigation.reset({index: 0, routes: [{name: 'Dashboards'}]});
    } else {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    }

  };
  useEffect(() => {
    loginFn();
  }, []);
};
export default SplashSreen;
