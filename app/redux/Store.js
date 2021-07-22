import {createStore} from 'redux';
import rootReducer from '../redux/reducer/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
//const store = createStore(rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export {store, persistor};
