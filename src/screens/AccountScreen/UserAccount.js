import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Login from '../LoginScreen/Login';
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';
import {UserContext} from '../../context/userContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {WatchListContext} from '../../context/WatchListContext';
import {useNavigation} from '@react-navigation/native';
import WatchListButton from '../../components/WatchListButton/WatchListButton';
// import {isLoadingContext} from '../../context/isLoadingContext';

const UserAccount = () => {
  const navigation = useNavigation();
  const [series, setSeries] = useContext(WatchListContext);
  const [user, setUser] = useContext(UserContext);
  // const [isLoading, setIsLoading] = useContext(isLoadingContext);

  const logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  if (!user) {
    return <Login />;
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 25, margin: 10, color: 'white'}}>
          Din Profil
        </Text>
        <FontAwesomeIcon
          style={{margin: 15}}
          name="user-circle-o"
          color="white"
          size={70}
        />
        <Text style={styles.text}>Email: {user.email}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.sectionText}>Din Titta-Lista innehåller:</Text>
          {/* {isLoading ? (
            <ActivityIndicator />
          ) : ( */}
          <Text style={styles.numberOfSeries}>{series.length} </Text>
          {/* )} */}

          {series.length === 1 ? (
            <Text style={styles.sectionText}>Serie</Text>
          ) : (
            <Text style={styles.sectionText}>Serier</Text>
          )}
        </View>
        <View style={styles.bottomWrapper}>
          <WatchListButton style={styles.watchListButton} />
          <Button onPress={logoff} title="Logga ut" color="white" />
        </View>
      </SafeAreaView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    width: 150,
    alignItems: 'center',
  },
  sectionText: {
    color: 'white',
    margin: 2,
    fontSize: 25,
  },
  text: {
    color: 'white',
    fontSize: 17,
  },
  numberOfSeries: {
    color: colors.pink,
    fontSize: 30,
    fontWeight: 'bold',
  },
  watchListButton: {
    marginVertical: 50,
  },
  wrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default UserAccount;
