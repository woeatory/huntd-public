export enum AuthStatus {
  Authenticating = 'Authenticating',
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Offline = 'Offline',
  NetworkError = 'NetworkError',
}

export interface AuthState {
  authStatus: AuthStatus;
  appleUser: string;
}

export interface AuthContextState {
  authState: AuthState;
  setAuthState: (options: Partial<AuthState>) => void;
}
