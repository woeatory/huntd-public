import React, { createContext, FC, useContext } from 'react';
import { PrimaryProfile } from '@/controllers/graphql/generated';

interface ProfileState {
  profileType: PrimaryProfile;
  setProfileType: (value: PrimaryProfile) => void;
}

const initialState: ProfileState = {
  profileType: PrimaryProfile.NotDefined,
  setProfileType: () => { /* EMPTY */ },
};

const ProfileContext = createContext<ProfileState>(initialState);

interface Props {
  data: ProfileState;
}

export const ProfileProvider: FC<Props> = (props) => {
  const { data, children } = props;

  return (
    <ProfileContext.Provider value={data}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
