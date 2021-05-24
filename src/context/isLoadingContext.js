import React, {useState} from 'react';
export const isLoadingContext = React.createContext();

export const LoadingProvider = props => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <isLoadingContext.Provider value={[isLoading, setIsLoading]}>
      {props.children}
    </isLoadingContext.Provider>
  );
};
