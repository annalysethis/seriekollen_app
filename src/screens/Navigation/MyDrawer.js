import React, {useState} from 'react';
import {useWindowDimensions, TouchableOpacity} from 'react-native';
import HomeScreen from '../HomeScreen/HomeScreen';
import DrawerContent from './DrawerContent';
import Login from '../LoginScreen/Login';
import {
  createDrawerNavigator,
  DrawerActions,
  setParams,
} from '@react-navigation/drawer';
import UserAccount from '../AccountScreen/UserAccount';
import WatchListScreen from '../WatchListScreen/WatchListScreen';
// import Register from '../RegistrationScreen/Register';
// import Header from '../../components/Header/Header';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Details from '../DetailsScreen/Details';
import SearchScreen from '../SearchScreen/SearchScreen';
import Register from '../RegistrationScreen/Register';

const MyDrawer = props => {
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const Drawer = createDrawerNavigator();
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={props => <DrawerContent {...props} />}
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={UserAccount} />
      <Drawer.Screen name="WatchList" component={WatchListScreen} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen
        name="SearchScreen"
        options={{cardStyleInterpolator: forFade}}
        component={SearchScreen}
      />
      <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
