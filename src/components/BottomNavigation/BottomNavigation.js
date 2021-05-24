import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import IconIonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const BottomNavigation = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}>
        <IconIonIcons name="menu-outline" color={colors.pink} size={40} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Seriekollen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 90,
    paddingBottom: 15,
    backgroundColor: colors.dark,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 31,
    left: 50,
    fontFamily: 'Avenir-Medium',
  },
});

export default BottomNavigation;
