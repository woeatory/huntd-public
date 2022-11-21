import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { AuthProvider, initialAuthState } from '@/controllers/auth/auth.context';
import { AuthState, AuthStatus } from '@/controllers/auth/auth.typedefs';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

type Props = Record<string, unknown>;

export const withAuthProvider = (Component: FC) => (props: Props) => {
  const [state, setState] = useState<AuthState>(initialAuthState);
  const [user, { loading, error }] = useAuthUser();

  const setAuthState = useCallback(
    (options: Partial<AuthState>) => {
      setState((prevAuthState) => ({
        ...prevAuthState,
        ...options,
      }));
    }, [],
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      setAuthState({
        authStatus: AuthStatus.NetworkError,
      });

      return;
    }

    setAuthState({
      authStatus: user ? AuthStatus.LoggedIn : AuthStatus.LoggedOut,
    });
  }, [user, loading, error, setAuthState]);

  return (
    <AuthProvider data={{ authState: state, setAuthState }}>
      <Component {...props} />
    </AuthProvider>
  );
};
