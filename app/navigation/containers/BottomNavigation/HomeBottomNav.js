import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../screen/Dashboard';
import Cummunity from '../../screen/Cummunity';
import More from '../../screen/More';
import TabBar from './TabBar';
import Likes from '../../screen/Likes';

const Tab = createBottomTabNavigator();

const HomeBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Finance" component={Cummunity} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default HomeBottomNav;
