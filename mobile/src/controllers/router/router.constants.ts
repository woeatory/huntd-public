import { StackNavigationProp } from '@react-navigation/stack';
import { CandidateProfileCityInput, PrimaryProfile } from '@/controllers/graphql/generated';
import { SelectOption } from '@/controllers/form/form.constants';

export enum StackRoutes {
  Home = 'Home',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Chat = 'Chat',
  Candidate = 'Candidate',
  Recruiter = 'Recruiter',
  Preferences = 'Preferences',
  Notifications = 'Notifications',
  ProfileFilling = 'ProfileFilling',
  Contacts = 'Contacts',
  ItemSelection = 'ItemSelection',
  CitySelection = 'CitySelection',
  TechnologiesSelection = 'TechnologiesSelection',
  LocationSelection = 'LocationSelection',
}

export type StackRoutesParamList = {
  [StackRoutes.Home]: undefined;
  [StackRoutes.SignIn]: undefined;
  [StackRoutes.SignUp]: undefined;
  [StackRoutes.Chat]: {
    chatId: number,
  };
  [StackRoutes.Candidate]: {
    slug: string,
  };
  [StackRoutes.Recruiter]: {
    slug: string,
  };
  [StackRoutes.Preferences]: undefined;
  [StackRoutes.Notifications]: undefined;
  [StackRoutes.ProfileFilling]: {
    type?: PrimaryProfile,
    specializationId?: string;
    technologiesIds?: string;
    jobExperienceId?: string;
    englishLevelId?: string;
    cities?: CandidateProfileCityInput[];
    location?: CandidateProfileCityInput;
  };
  [StackRoutes.Contacts]: undefined;
  [StackRoutes.ItemSelection]: {
    items: SelectOption[];
    backRoute: StackRoutes;
    name: string;
    multiSelection?: boolean;
  };
  [StackRoutes.CitySelection]: {
    backRoute: StackRoutes;
    cities: CandidateProfileCityInput[];
  };
  [StackRoutes.TechnologiesSelection]: {
    backRoute: StackRoutes;
    selectedIds: number[];
  };
  [StackRoutes.LocationSelection]: {
    backRoute: StackRoutes;
  };
}

export enum HomeTabs {
  Chats = 'Chats',
  Profile = 'Profile',
  Jobs = 'Jobs',
}

export type NavigationProp = StackNavigationProp<StackRoutesParamList>;
