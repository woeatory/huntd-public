import {
  ProfileConnectionInitiator,
  ProfileConnectionWithProfilesFragment,
  ProfileConnectionWithUsersFragment,
} from '@/controllers/graphql/generated';

type ChatUser = ProfileConnectionWithUsersFragment['candidateUser']
  | ProfileConnectionWithUsersFragment['recruiterUser']
  | null
type ChatUserProfile = ProfileConnectionWithProfilesFragment['candidateProfile']
  | ProfileConnectionWithProfilesFragment['recruiterProfile']
type ProfileConnectionWithBuddies = ProfileConnectionWithProfilesFragment
  & ProfileConnectionWithUsersFragment;

interface ChatUserMeta {
  user: ChatUser;
  profile: ChatUserProfile;
  type: ProfileConnectionInitiator;
}

interface GetChatUserMeta {
  (profileConnection: ProfileConnectionWithBuddies): ChatUserMeta
}
export const getChatUserMeta: GetChatUserMeta = (profileConnection) => {
  const { Candidate, Recruiter } = ProfileConnectionInitiator;
  const {
    candidateUser,
    recruiterUser,
    candidateProfile,
    recruiterProfile,
  } = profileConnection;

  const chatUserType = recruiterUser.isAuthUser
    ? Recruiter
    : Candidate;

  const chatUser = chatUserType === Candidate
    ? candidateUser
    : recruiterUser;

  const chatProfile = chatUserType === Candidate
    ? candidateProfile
    : recruiterProfile;

  return {
    type: chatUserType,
    user: chatUser ?? null,
    profile: chatProfile,
  };
};
