import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BreakingBadDetails from '../screens/BreakingBadDetails';
import BreakingBadList from '../screens/BreakingBadList';
import Favourite from '../screens/Favourite';
import searchBreakingBad from '../screens/searchBreakingBad';

const AppStack = createStackNavigator();
const Navigations = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          <AppStack.Screen name="BreakingBadList" component={BreakingBadList} />
          <AppStack.Screen
            name="BreakingBadDetails"
            component={BreakingBadDetails}
          />
          <AppStack.Screen name="Favourite" component={Favourite} />
          <AppStack.Screen
            name="searchBreakingBad"
            component={searchBreakingBad}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigations;
