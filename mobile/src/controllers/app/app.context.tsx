import { AppStateStatus } from 'react-native';
import React, { createContext, FC, useContext } from 'react';

interface AppStateInterface {
  status: AppStateStatus;
}

const initialState: AppStateInterface = {
  status: 'active',
};

const AppStatusContext = createContext(initialState);

interface Props {
  data: AppStateInterface;
}

export const AppStateProvider: FC<Props> = (props) => {
  const { children, data } = props;

  return (
    <AppStatusContext.Provider value={data}>
      {children}
    </AppStatusContext.Provider>
  );
};

export const useAppStatusContext = () => useContext(AppStatusContext);
