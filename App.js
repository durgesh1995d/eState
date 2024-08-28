import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistors} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import CommonComponent from './app/navigation/components/CommonComponent';
import AppStackRoute from './app/navigation/containers/AppStackRoute';

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const getNetwork = async () => {
    let isNetwork = false;
    await NetInfo.fetch().then((state) => {
      isNetwork = state.isConnected;
    });
    return isNetwork;
  };
  getNetwork();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistors}>
          <AppStackRoute ref={navigationRef} />
          <CommonComponent navigationRef={navigationRef} />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
