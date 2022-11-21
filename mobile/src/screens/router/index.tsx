import React, { FC, useMemo } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '@/controllers/auth/auth.context';
import { AuthStatus } from '@/controllers/auth/auth.typedefs';
import { Error } from '@/components/Base/Error';
import { AuthRouter } from '@/screens/router/auth.router';
import { GuestRouter } from '@/screens/router/guest.router';

const getRouteComponent = (authStatus: AuthStatus) => {
  switch (authStatus) {
    case AuthStatus.Authenticating:
      return <AppLoading />;

    case AuthStatus.NetworkError:
      return <Error message="network_error" />;

    case AuthStatus.LoggedIn:
      return <AuthRouter />;

    default:
      return <GuestRouter />;
  }
};

export const Router: FC = () => {
  const { authState } = useAuthContext();

  const RouteComponent = useMemo(
    () => getRouteComponent(authState.authStatus),
    [authState.authStatus],
  );

  return (
    <NavigationContainer>
      {RouteComponent}
    </NavigationContainer>
  );
};
