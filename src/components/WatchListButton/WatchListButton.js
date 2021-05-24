import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Button,
} from 'react-native';
// import colors from '../../constants/colors';
// import BurgerBtn from '../BurgerBtn/BurgerBtn';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconIonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {WatchListContext} from '../../context/WatchListContext';

const WatchListButton = props => {
  const navigation = useNavigation();
  const [series, setSeries] = useContext(WatchListContext);

  const GetData = () => {
    fetch('http://localhost:3002/posts')
      .then(response => response.json())
      .then(json => {
        setSeries(json);
      })
      .catch(error => alert(error));
    // throw error;
  };

  return (
    <View style={{...props.style}}>
      <Button
        onPress={() => {
          GetData();
          navigation.navigate('WatchList');
        }}
        title="Min Titta-Lista"
        color="white"
      />
    </View>
  );
};

export default WatchListButton;
