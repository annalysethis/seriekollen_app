import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import ItemCard from '../../components/ItemCard/ItemCard';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {seriesData} from '../../data/series';

const seriesURL =
  'https://608281125dbd2c0017579b02.mockapi.io/seriekollen/series';

const HomeScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(seriesURL)
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   setData(seriesData);
  //   setLoading(false);
  // }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Serier</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchScreen', {
                data: data,
              });
            }}>
            <IconMaterialIcons name="search" color="white" size={35} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <View style={styles.listWrapper}>
              <Text style={styles.text}>Comedy</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('comedy') && <ItemCard item={item} />
                }
              />
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.text}>Drama</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('drama') && <ItemCard item={item} />
                }
              />
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.text}>History</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('history') && <ItemCard item={item} />
                }
              />
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.text}>Sci-Fi</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('sci-fi') && <ItemCard item={item} />
                }
              />
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.text}>Thriller</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('thriller') && <ItemCard item={item} />
                }
              />
            </View>

            <View style={styles.listWrapper}>
              <Text style={styles.text}>Action</Text>
              <FlatList
                horizontal={true}
                data={data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, id}) =>
                  item.category
                    .map(e => e.toLocaleLowerCase())
                    .includes('action') && <ItemCard item={item} />
                }
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  listWrapper: {
    paddingVertical: 5,
  },
  headerBox: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 7,
    borderBottomColor: '#727070',
    borderWidth: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 17,
    marginLeft: 6,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
