import React, { createContext, FC, useContext } from 'react';
import { AuthContextState, AuthStatus } from '@/controllers/auth/auth.typedefs';

export const initialAuthState = {
  authStatus: AuthStatus.Authenticating,
  appleUser: '',
};

const initialState: AuthContextState = {
  authState: initialAuthState,
  setAuthState: () => { /* empty */ },
};

const AuthContext = createContext(initialState);

interface Props {
  data: AuthContextState;
}

export const AuthProvider: FC<Props> = ({ children, data }) => (
  <AuthContext.Provider value={data}>
    {children}
  </AuthContext.Provider>
);

export const useAuthContext = () => useContext(AuthContext);
