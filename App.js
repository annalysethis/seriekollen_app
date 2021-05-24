/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './src/screens/Navigation/MyDrawer';
import {WatchListProvider} from './src/context/WatchListContext';
import {UserProvider} from './src/context/userContext';
import GetData from './src/MongoDB/getData';
import {LoadingProvider} from './src/context/isLoadingContext';

const App = ({navigation}) => {
  return (
    <LoadingProvider>
      <UserProvider>
        <WatchListProvider>
          <NavigationContainer>
            <MyDrawer />
            <GetData />
          </NavigationContainer>
        </WatchListProvider>
      </UserProvider>
    </LoadingProvider>
  );
};

export default App;
