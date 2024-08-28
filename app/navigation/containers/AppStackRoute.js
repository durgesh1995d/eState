import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screen/Dashboard';
import Cummunity from '../screen/Cummunity';
import More from '../screen/More';
import HomeBottomNav from './BottomNavigation/HomeBottomNav';
import DetailScreen from '../screen/DetailScreen';
import Login from '../screen/Login';
import SplashSreen from '../components/SplashScreen';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};
const AppStackRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashSreen}
        options={screenOptions}
      />

      <Stack.Screen name="Login" component={Login} options={screenOptions} />
      <Stack.Screen
        name="Dashboards"
        component={HomeBottomNav}
        options={screenOptions}
      />

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({route}) => ({title: route.params.name})}
      />

      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Cummunity" component={Cummunity} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
};

export default AppStackRoute;
