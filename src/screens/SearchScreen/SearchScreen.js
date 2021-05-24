import React, {useState, useEffect, useContext} from 'react';
//  import Header from './components/Header';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Login from '../LoginScreen/Login';
import {WatchListContext} from '../../context/WatchListContext';
import ItemCard from '../../components/ItemCard/ItemCard';
import Images from '../../images/imageExports';
import colors from '../../constants/colors';
import {color} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {AddedIdContext} from '../../context/AddedIdContext';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation} from '@react-navigation/native';
// import Header from 'components/Header/Header';

const SearchScreen = ({navigation, route, data}) => {
  const [value, setValue] = useState('');
  const [filteredSeries, setFilteredSeries] = useState([]);

  const handleChange = val => {
    setValue(val);
  };

  React.useEffect(() => {
    let results = route.params.data.filter(series =>
      series.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSeries(results);
  }, [route.params.data, value]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); //if we tap somewhere else we dismiss the keyboard
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity
            style={{left: 15}}
            onPress={() => {
              navigation.goBack();
            }}>
            <IoniconsIcon name="chevron-back-circle" color="white" size={40} />
          </TouchableOpacity>
          <TextInput
            value={value}
            type="text"
            placeholder="Sök Serie"
            placeholderTextColor="#8e7171"
            onChangeText={handleChange}
            style={styles.SearchBox}
          />
          {/* <IconMaterialIcons name="search" color="white" size={35} /> */}
        </View>
        {value ? (
          <View>
            <FlatList
              data={filteredSeries}
              keyExtractor={({id}, index) => id}
              renderItem={({item, id}) => (
                <ItemCard item={item} style={styles.itemCard} />
              )}
            />
          </View>
        ) : (
          <Text style={styles.text}>Vilken serie söker du?</Text>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  itemCard: {
    width: '90%',
    height: 470,
    alignSelf: 'center',
    marginHorizontal: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  SearchBox: {
    marginRight: 5,
    flex: 1,
    marginHorizontal: 20,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: colors.dark,
    borderRadius: 5,
    fontSize: 20,
    color: 'white',
  },
  headerBox: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 7,
    borderBottomColor: '#727070',
    borderWidth: 1,
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    margin: 30,
    fontSize: 20,
  },
});

export default SearchScreen;
