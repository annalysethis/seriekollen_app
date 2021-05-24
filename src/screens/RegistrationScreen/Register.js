import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import UserAccount from '../AccountScreen/UserAccount';
import colors from '../../constants/colors';
import {UserContext} from '../../context/userContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import {useNavigation} from '@react-navigation/native';

const Register = props => {
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useContext(UserContext);

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then(() => {
        console.log('User account created & signed in!');
        setWeakPassword(false);
        setInvalidEmail(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setInvalidEmail(true);
        } else {
          setInvalidEmail(false);
        }
        if (error.code === 'auth/weak-password') {
          setWeakPassword(true);
        } else {
          setWeakPassword(false);
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
            <Text style={styles.title}>Skapa konto</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={text => setNewEmail(text)}
              value={newEmail}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Lösenord"
              onChangeText={text => setNewPassword(text)}
              value={newPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => createUser()}>
              <Text style={styles.buttonTitle}>Skapa konto</Text>
            </TouchableOpacity>
            {invalidEmail && (
              <Text style={styles.warningText}>
                Du har angivit en ogiltig email address
              </Text>
            )}
            {weakPassword && (
              <Text style={styles.warningText}>
                Ditt lösenord är för svagt. Försök igen.
              </Text>
            )}
            <View style={styles.wrapper}>
              <Text style={styles.text}>Har du redan ett konto?</Text>

              <Button
                onPress={() => navigation.navigate('Login')}
                title="Klicka här för att logga in!"
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
  CreateAccountTitle: {
    margin: 20,
    color: 'grey',
  },
  text: {
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
    marginTop: 10,
  },
});

export default Register;
