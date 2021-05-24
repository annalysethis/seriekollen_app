import React, {useState} from 'react';

export const WatchListContext = React.createContext();

export const WatchListProvider = props => {
  const [series, setSeries] = useState([]);
  return (
    <WatchListContext.Provider value={[series, setSeries]}>
      {props.children}
    </WatchListContext.Provider>
  );
};
