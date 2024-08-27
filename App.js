import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RouteSwitch from './app/navigation/containers/RouteSwitch';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store, {persistors} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const getNetwork = async () => {
    let isNetwork = false;
    await NetInfo.fetch().then((state) => {
      isNetwork = state.isConnected;
      console.log('App start===>', state);
    });
    return isNetwork;
  };
  getNetwork();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistors}>
          <RouteSwitch />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
