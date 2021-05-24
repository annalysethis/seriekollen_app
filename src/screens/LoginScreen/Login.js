import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import UserAccount from '../AccountScreen/UserAccount';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Register from '../RegistrationScreen/Register';
import colors from '../../constants/colors';
import {UserContext} from '../../context/userContext';
import {NavigationHelpersContext} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidPasswordOrEmail, setInvalidPasswordOrEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useContext(UserContext);

  const logInUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User details valid & signed in!');
        setInvalidPasswordOrEmail(false);
        setInvalidEmail(false);
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setInvalidEmail(true);
        } else {
          setInvalidEmail(false);
        }
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          setInvalidPasswordOrEmail(true);
        } else {
          setInvalidPasswordOrEmail(false);
        }

        console.error(error);
      });
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.Container}>
          <SafeAreaView style={{alignItems: 'center', flex: 1}}>
            <Text style={styles.title}>Logga in</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={text => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Lösenord"
              onChangeText={text => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => {
                logInUser();
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Logga in</Text>
              </View>
            </TouchableOpacity>
            {invalidPasswordOrEmail && (
              <Text style={styles.warningText}>
                Användaren kan inte hittas.
              </Text>
            )}
            {invalidEmail && (
              <Text style={styles.warningText}>
                Du har angivit en ogiltig email address
              </Text>
            )}
            <View style={styles.wrapper}>
              <Text style={styles.text}>Har du inget konto?</Text>

              <Button
                onPress={() => navigation.navigate('Register')}
                title="Klicka här för att skapa ett!"
                color={colors.pink}
              />
            </View>
          </SafeAreaView>
          <BottomNavigation />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{flex: 1}}>
      <UserAccount />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    marginTop: 60,
    padding: 10,
    fontSize: 30,
    color: 'white',
  },
  input: {
    padding: 5,
    margin: 10,
    width: 260,
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: colors.pink,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 17,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 19,
    margin: 10,
  },
  wrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  warningText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 19,
    margin: 5,
  },
});

export default Login;
