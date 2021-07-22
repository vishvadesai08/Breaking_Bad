import React from 'react';
import {Text} from 'react-native';
import Navigation from './app/navigations/Navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {store, persistor} from './app/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
AntDesign.loadFont();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation></Navigation>
      </PersistGate>
    </Provider>
  );
};

export default App;
