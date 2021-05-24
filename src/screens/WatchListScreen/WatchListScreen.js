import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import {WatchListContext} from '../../context/WatchListContext';
import Images from '../../images/imageExports';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const WatchListScreen = ({navigation, route}) => {
  const [series, setSeries] = useContext(WatchListContext);
  const [wantNotification, setWantNotification] = useState(false);
  // const [isLoading, setIsLoading] = useContext(WatchListContext);

  const removeById = id => {
    setSeries(series.filter(items => items.title !== id.title));
  };

  const removeFromWatchList = async id => {
    console.log(`hello ${id}`);
    console.log('hello ID', id._id);
    try {
      const responseDel = await fetch(`http://localhost:3002/posts/${id._id}`, {
        method: 'DELETE',
      });

      if (!responseDel.ok) throw new Error('API request not ok');

      removeById(id);
    } catch (error) {
      console.log(error);
    }
  };

  // const removeFromWatchList = itemToRemove => {
  //   // console.log('itemToRemove', itemToRemove.id);
  //   setSeries(series.filter(items => items.title !== itemToRemove.title));
  //   // setIdAddedToWatchList(
  //   //   idAddedToWatchList.filter(items => items !== itemToRemove.id),
  //   // );
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, marginBottom: 70}}>
        <View style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
          <TouchableOpacity
            style={{left: 15}}
            onPress={() => {
              navigation.goBack();
            }}>
            <IoniconsIcon name="chevron-back-circle" color="white" size={40} />
          </TouchableOpacity>
          <View style={styles.headersRow}>
            <Text style={styles.headerText}>Min Lista</Text>
            {series == '' ? (
              <View />
            ) : (
              <Text style={styles.headerText}>Få Notis</Text>
            )}
          </View>
        </View>
        <View>
          {series == '' ? (
            <Text style={styles.noItemsText}>
              Du har inga serier i din lista.
            </Text>
          ) : (
            <FlatList
              data={series}
              /* keyExtractor={({id}, index) => id} */
              keyExtractor={(item, index) => {
                return item._id;
              }}
              renderItem={({item, i}) => (
                <View id={item._Id} style={styles.itemBox}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Details', {
                        _id: item._id,
                        id: item.id,
                        title: item.title,
                        nextReleaseDate: item.nextReleaseDate,
                        image: item.image,
                        releaseYears: item.releaseYears,
                        item: item,
                        category: item.category,
                        length: item.length,
                        streaming: item.streaming,
                        description: item.description,
                        language: item.language,
                        seasons: item.seasons,
                        rating: item.rating,
                        creators: item.creators,
                      });
                    }}>
                    <Image
                      source={Images[item.image]}
                      style={styles.styledImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.textBox}>
                    <Text style={styles.text}>{item.title} </Text>

                    <Text style={styles.text}>Nästa Säsong släpps:</Text>
                    <Text style={styles.textDate}>
                      {item.nextReleaseDate !== ''
                        ? item.nextReleaseDate
                        : 'ingen information finns'}
                    </Text>
                  </View>

                  <View style={styles.wrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        removeFromWatchList(item);
                      }}>
                      <EntypoIcon name="cross" color="#cdcbcb" size={20} />
                    </TouchableOpacity>
                    <CheckBox
                      disabled={false}
                      /* value={wantNotification} */
                      onValueChange={() => {
                        setWantNotification(true);
                      }}
                      style={styles.checkbox}
                      onCheckColor={colors.pink}
                      onTintColor={colors.pink}
                      tintColor="#cdcbcb"
                    />
                  </View>
                </View>
              )}
            />
          )}
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginLeft: 5,
  },
  noItemsText: {
    color: 'white',
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
  styledImage: {
    width: 60,
    height: 90,
    margin: 5,
  },
  headersRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemBox: {
    marginHorizontal: 10,
    borderRadius: 7,
    marginTop: 3,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#cdcbcb',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  textBox: {
    paddingLeft: 8,
  },
  checkbox: {
    marginTop: 10,
    marginRight: 25,
  },
  wrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 17,
    marginTop: 12,
    color: 'white',
  },
  textDate: {
    fontSize: 15,
    color: 'white',
  },
});

export default WatchListScreen;
