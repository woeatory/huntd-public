import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AppStateProvider } from '@/controllers/app/app.context';

type Props = Record<string, unknown>;

export const withAppStatusProvider = (Component: FC) => (props: Props) => {
  const [appStatus, setAppStatus] = useState<AppStateStatus>('unknown');

  const handleAppState = useCallback((nextAppState: AppStateStatus) => {
    setAppStatus(nextAppState);
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppState);

    return () => {
      AppState.removeEventListener('change', handleAppState);
    };
  }, [handleAppState]);

  return (
    <AppStateProvider data={{ status: appStatus }}>
      <Component {...props} />
    </AppStateProvider>
  );
};
