import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {WatchListContext} from '../context/WatchListContext';
// import {isLoadingContext} from '../../context/isLoadingContext';

const GetData = () => {
  const [series, setSeries] = useContext(WatchListContext);

  useEffect(() => {
    fetch('http://localhost:3002/posts')
      .then(response => response.json())
      .then(json => {
        setSeries(json);
      })

      .catch(error => alert(error));
  }, []);

  return <View />;
};

export default GetData;
