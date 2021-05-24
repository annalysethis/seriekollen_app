import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WatchListContext} from '../../context/WatchListContext';

const AddToWatchList = ({item}) => {
  const navigation = useNavigation();
  const [series, setSeries] = useContext(WatchListContext);
  const [idAddedToWatchList, setIdAddedToWatchList] = useState([]);

  const submitIdHandler = () => {
    const newSeries = {...series, key: item.id};
    if (idAddedToWatchList.includes(item.id)) {
      return '';
    } else {
      return setIdAddedToWatchList(currentState => [
        ...currentState,
        newSeries.key,
      ]);
    }
  };

  // ****** OLD ********
  // const submitSeriesHandler = async () => {
  //   try {
  //     let addedSeries = {...item, key: item.id};
  //     if (idAddedToWatchList.includes(item.id)) {
  //       Alert.alert('OOPS!', `Du har redan lagt till ${addedSeries.title}`, [
  //         {text: 'OK', onPress: () => console.log('alert closed')},
  //       ]);
  //     } else {
  //       setSeries(currentSeriesState => [...currentSeriesState, addedSeries]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   Keyboard.dismiss();
  // };

  const submitSeriesHandler = async () => {
    try {
      let addedSeries = series.map(i => i.title);
      if (
        idAddedToWatchList.includes(item.id) ||
        addedSeries.includes(item.title)
      ) {
        Alert.alert('OOPS!', `Du har redan lagt till ${item.title}`, [
          {text: 'OK', onPress: () => console.log('alert closed')},
        ]);
      } else {
        saveData();
      }
    } catch (e) {
      console.log(e);
    }
    Keyboard.dismiss();
  };

  const saveData = async () => {
    try {
      await fetch('http://localhost:3002/posts', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          nextReleaseDate: item.nextReleaseDate,
          image: item.image,
          id: item.id,
          releaseYears: item.releaseYears,
          category: item.category,
          streaming: item.streaming,
          description: item.description,
          language: item.language,
          seasons: item.seasons,
          length: item.length,
          rating: item.rating,
          creators: item.creators,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(
    'TITEL',
    series.map(i => i.title),
  );
  const buttonHandler = () => {
    const addedSeries = series.map(i => i.title);
    if (
      idAddedToWatchList.includes(item.id) ||
      addedSeries.includes(item.title)
    ) {
      return (
        <View style={styles.iconWrapper}>
          <Text style={styles.iconText}>Tillagd!</Text>
          <MaterialCommunityIcon name="eye-check" color="white" size={35} />
        </View>
      );
    } else {
      return (
        <View style={styles.iconWrapper}>
          <Text style={styles.iconText}>Lägg till</Text>
          <MaterialCommunityIcon name="eye-plus" color="white" size={35} />
        </View>
      );
    }
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={{width: 60}}
        onPress={() => {
          submitSeriesHandler();
          submitIdHandler();
        }}>
        {buttonHandler()}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default AddToWatchList;

const styles = StyleSheet.create({
  styledImage: {
    width: 100,
    height: 150,
    margin: 10,
  },
  iconWrapper: {
    width: 70,
    alignItems: 'center',
    marginTop: 11,
  },
  iconText: {
    color: 'white',
  },
});
