import {
  ProfileConnectionInitiator,
  ProfileConnectionWithProfilesFragment,
  ProfileConnectionWithUsersFragment,
} from '@/controllers/graphql/generated';

type ChatBuddyUser = ProfileConnectionWithUsersFragment['candidateUser']
  | ProfileConnectionWithUsersFragment['recruiterUser']
  | null
type ChatBuddyProfile = ProfileConnectionWithProfilesFragment['candidateProfile']
  | ProfileConnectionWithProfilesFragment['recruiterProfile']
type ProfileConnectionWithBuddies = ProfileConnectionWithProfilesFragment
  & ProfileConnectionWithUsersFragment;

interface ChatBuddyMeta {
  user: ChatBuddyUser;
  profile: ChatBuddyProfile;
  type: ProfileConnectionInitiator;
}

interface GetChatBuddyMeta {
  (profileConnection: ProfileConnectionWithBuddies): ChatBuddyMeta
}
export const getChatBuddyMeta: GetChatBuddyMeta = (profileConnection) => {
  const { Candidate, Recruiter } = ProfileConnectionInitiator;
  const {
    candidateUser,
    recruiterUser,
    candidateProfile,
    recruiterProfile,
  } = profileConnection;

  const chatBuddyType = recruiterUser.isAuthUser
    ? Candidate
    : Recruiter;

  const chatBuddyUser = chatBuddyType === Candidate
    ? candidateUser
    : recruiterUser;

  const chatBuddyProfile = chatBuddyType === Candidate
    ? candidateProfile
    : recruiterProfile;

  return {
    type: chatBuddyType,
    user: chatBuddyUser ?? null,
    profile: chatBuddyProfile,
  };
};
