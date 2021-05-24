import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  List,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import {UserContext} from '../../context/userContext';
import {WatchListContext} from '../../context/WatchListContext';

const DrawerContent = props => {
  const [series, setSeries] = useContext(WatchListContext);
  const [user, setUser] = useContext(UserContext);

  const GetData = () => {
    fetch('http://localhost:3002/posts')
      .then(response => response.json())
      .then(json => {
        setSeries(json);
      })
      .catch(error => alert(error));
  };

  const logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={{width: 50}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <EntypoIcon
            style={{marginLeft: 15}}
            name="circle-with-cross"
            color={colors.pink}
            size={35}
          />
        </TouchableOpacity>
        <View style={styles.drawerContent}>
          <SafeAreaView>
            {user && (
              <View style={styles.userInfoSection}>
                <FontAwesomeIcon name="user-circle-o" color="white" size={70} />
                <Text style={styles.UserName}>{user.email}</Text>
              </View>
            )}

            {user ? (
              <DrawerItem
                icon={({size}) => (
                  <Icon name="account-outline" color="#ffff" size={size} />
                )}
                label="Profil"
                inactiveTintColor="#ffff"
                activeTintColor="#ddd"
                labelStyle={{fontSize: 20}}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              />
            ) : (
              <DrawerItem
                icon={({size}) => (
                  <Icon name="account-outline" color="#ffff" size={size} />
                )}
                label="Logga in"
                inactiveTintColor="#ffff"
                activeTintColor="#ddd"
                labelStyle={{fontSize: 20}}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              />
            )}

            <DrawerItem
              icon={({size}) => (
                <Icon name="movie-outline" color="#ffff" size={size} />
              )}
              label="Serier"
              inactiveTintColor="#ffff"
              activeTintColor="#ddd"
              labelStyle={{fontSize: 20}}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            {user && (
              <DrawerItem
                icon={({size}) => (
                  <Icon name="eye-outline" color="#ffff" size={size} />
                )}
                label="Min titta Lista"
                inactiveTintColor="#ffff"
                activeTintColor="#ddd"
                labelStyle={{fontSize: 20}}
                onPress={() => {
                  GetData();
                  props.navigation.navigate('WatchList');
                }}
              />
            )}
          </SafeAreaView>
        </View>
      </DrawerContentScrollView>
      <View style={styles.BottomDrawerSection}>
        {user && (
          <DrawerItem
            icon={({size}) => (
              <Icon name="exit-to-app" color="#ffff" size={size} />
            )}
            label="Logga ut"
            inactiveTintColor="#ffff"
            activeTintColor="#ddd"
            labelStyle={{fontSize: 20}}
            onPress={() => {
              logoff();
              props.navigation.navigate('Login');
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  drawerContent: {
    paddingTop: 50,
    flexDirection: 'column',
  },
  userInfoSection: {
    marginBottom: 30,
    padding: 10,
    paddingBottom: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  UserName: {
    fontSize: 17,
    color: 'white',
    marginTop: 20,
  },
  listItem: {
    color: 'white',
    fontSize: 20,
    padding: 20,
  },
});

export default DrawerContent;
