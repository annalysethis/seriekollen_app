import React, {useState, useEffect} from 'react';
//  import Header from './components/Header';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../../images/imageExports';
import {useNavigation} from '@react-navigation/native';

const ItemCard = props => {
  const navigation = useNavigation();

  return (
    <View key={props.item.id}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            id: props.item.id,
            title: props.item.title,
            nextReleaseDate: props.item.nextReleaseDate,
            image: props.item.image,
            releaseYears: props.item.releaseYears,
            item: props.item,
            category: props.item.category,
            length: props.item.length,
            streaming: props.item.streaming,
            description: props.item.description,
            language: props.item.language,
            seasons: props.item.seasons,
            rating: props.item.rating,
            creators: props.item.creators,
          });
        }}>
        <Image
          source={Images[props.item.image]}
          style={{...styles.styledImage, ...props.style}}
        />
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  styledImage: {
    width: 100,
    height: 150,
    margin: 10,
    borderRadius: 7,
  },
});
