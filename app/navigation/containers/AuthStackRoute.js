import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screen/Dashboard';
import Cummunity from '../screen/Cummunity';
import More from '../screen/More';

const Stack = createNativeStackNavigator();

const AuthStackRoute = () => {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Dashboard" screen={Dashboard} />
      <Stack.Screen name="Dashboard" screen={Dashboard} />
      <Stack.Screen name="Cummunity" screen={Cummunity} />
      <Stack.Screen name="More" screen={More} />
    </Stack.Navigator>
  );
};

export default AuthStackRoute;
