import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {composeWithDevTools} from '@redux-devtools/extension';
import {applyMiddleware, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel2,
  // whitelist: [],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  __DEV__ ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);

let persistors = persistStore(store);

export {persistors};
export default store;
