import React, {useState, useEffect, useContext} from 'react';
//  import Header from './components/Header';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Images from '../../images/imageExports';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import AddToWatchList from '../../components/AddToWatchList/AddToWatchList';
import {UserContext} from '../../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WatchListContext} from '../../context/WatchListContext';
import WatchListButton from '../../components/WatchListButton/WatchListButton';

const Details = ({route, navigation}) => {
  const [user, setUser] = useContext(UserContext);
  const [series, setSeries] = useContext(WatchListContext);

  const {image} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={{left: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <IoniconsIcon
            name="chevron-back-circle"
            color={colors.pink}
            size={40}
          />
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            {route.params.title} ({route.params.releaseYears})
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{height: 550}}>
          <Image
            source={Images[image]}
            style={styles.styledImage}
            accessibilityLabel={route.params.title}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.smallText}>
              {route.params.length} min | {route.params.category[0]},{' '}
              {route.params.category[1]}, {route.params.category[2]} |{' '}
              {route.params.streaming[0]}, {route.params.streaming[1]}
            </Text>
          </View>
          <View style={{paddingTop: 10, flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                paddingTop: 30,
              }}>
              <Image source={Images.IMDB} style={{width: 40, height: 20}} />
              <Text style={styles.rating}>{route.params.rating}</Text>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
              {user && <AddToWatchList item={route.params.item} />}
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              Skapad av: {route.params.creators[0]}, {route.params.creators[1]}
            </Text>
            <Text style={styles.text}>{route.params.description}</Text>
            <Text style={styles.text}>Säsonger: {route.params.seasons}</Text>

            <Text style={styles.text}>
              Senaste utgivningsdatum:{' '}
              {route.params.nextReleaseDate == ''
                ? 'Ingen information tillgänglig'
                : `${route.params.nextReleaseDate}`}{' '}
            </Text>
          </View>
        </View>
        {user && <WatchListButton style={styles.button} />}
        {/* </SafeAreaView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // alignItems: 'center',
  },
  styledImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  titleBox: {
    backgroundColor: colors.pink,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
    // backgroundColor: colors.purple,
  },
  button: {
    height: 40,
    backgroundColor: colors.dark,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  smallText: {
    color: 'white',
    fontSize: 15,
  },
  text: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 17,
  },
  rating: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Details;
