import { logOutResolver } from '@/modules/user/user.resolvers/logOut.resolver';
import { primaryProfileResolver } from '@/modules/user/user.resolvers/primaryProfile.resolver';
import { updateProfileContactsResolver } from '@/modules/user/user.resolvers/updateProfileContacts.resolver';
import { serviceUserResolver } from '@/modules/user/user.resolvers/serviceUser.resolver';
import { isAuthUserResolver } from '@/modules/user/user.resolvers/isAuthUser.resolver';
import { profileConnectionsResolver } from '@/modules/user/user.resolvers/profileConnections.resolver';
import { userUnreadMessagesCountResolver } from '@/modules/user/user.resolvers/userUnreadMessagesCount.resolver';
import { userUnreadMessagesCountUpdatedResolver } from '@/modules/user/user.resolvers/userUnreadMessagesCountUpdated.resolver';
import { signInAsUserResolver } from '@/modules/user/user.resolvers/signInAsUser.resolver';
import { logOutFromUserResolver } from '@/modules/user/user.resolvers/logOutFromUser.resolver';
import { adminUserResolver } from '@/modules/user/user.resolvers/adminUser.resolver';
import { uploadUserCvResolver } from '@/modules/user/user.resolvers/uploadUserCv.resolver';
import { userCvResolver } from '@/modules/user/user.resolvers/userCvResolver.resolver';
import { usersSearchSubscriptionsResolver } from '@/modules/user/user.resolvers/usersSearchSubscriptions.resolver';
import { userMessageTemplatesResolver } from '@/modules/user/user.resolvers/userMessageTemplates.resolver';
import { isFirstTimeFillingCandidateProfileResolver } from '@/modules/user/user.resolvers/isFirstTimeFillingCandidateProfile.resolver';
import { userSettingsResolver } from '@/modules/user/user.resolvers/userSettings.resolver';
import { uploadAvatarResolver } from '@/modules/user/user.resolvers/uploadAvatar.resolver';
import { avatarResolver } from '@/modules/user/user.resolvers/avatarResolver.resolver';
import { adminSettingsResolver } from '@/modules/user/user.resolvers/adminSettings.resolver';
import { churnedUsersResolver } from '@/modules/user/user.resolvers/churnedUsers.resolver';
import { createUserResolver } from '@/modules/user/user.resolvers/createUser.resolver';
import { userByUsernameResolver } from '@/modules/user/user.resolvers/userByUsername.resolver';
import { signUpAsInactiveUserResolver } from '@/modules/user/user.resolvers/signUpAsInactiveUser.resolver';
import { socialSignUpAsInactiveUserResolver } from '@/modules/user/user.resolvers/socialSignUpAsInactiveUser.resolver';
import { authUserResolver } from '@/modules/user/user.resolvers/authUser.resolver';
import { confirmEmailResolver } from '@/modules/user/user.resolvers/confirmEmail.resolver';
import { forgotPasswordResolver } from '@/modules/user/user.resolvers/forgotPassword.resolver';
import { resetPasswordResolver } from '@/modules/user/user.resolvers/resetPassword.resolver';
import { sendConfirmEmailLinkResolver } from '@/modules/user/user.resolvers/sendConfirmEmailLink.resolver';
import { signInResolver } from '@/modules/user/user.resolvers/signIn.resolver';
import { signUpResolver } from '@/modules/user/user.resolvers/signUp.resolver';
import { socialSignUpResolver } from '@/modules/user/user.resolvers/socialSignUp.resolver';
import { removeUserCvResolver } from '@/modules/user/user.resolvers/removeUserCv.resolver';
import { changePasswordResolver } from '@/modules/user/user.resolvers/changePassword.resolver';
import { hasVacanciesSourceResolver } from '@/modules/user/user.resolvers/hasVacanciesSource.resolver';
import { isFirstTimeFillingRecruiterProfileResolver } from '@/modules/user/user.resolvers/isFirstTimeFillingRecruiterProfile.resolver';
import { hiresResolver } from '@/modules/user/user.resolvers/hires.resolver';
import { userByPendingConnectionsResolver } from '@/modules/user/user.resolvers/usersByPendingConnections.resolver';
import { usersNftsResolver } from '@/modules/user/user.resolvers/usersNfts.resolver';
import { setNftAvatarResolver } from '@/modules/user/user.resolvers/setNftAvatar.resolver';

export const UserResolvers = {
  Subscription: {
    userUnreadMessagesCountUpdated: {
      subscribe: userUnreadMessagesCountUpdatedResolver,
    },
  },

  Query: {
    authUser: authUserResolver,
    adminUser: adminUserResolver,
    serviceUser: serviceUserResolver,
    usersWithChurnedCandidateProfiles: churnedUsersResolver,
    userByUsername: userByUsernameResolver,
    usersByPendingConnections: userByPendingConnectionsResolver,
  },

  Mutation: {
    signUp: signUpResolver,
    signUpAsInactiveUser: signUpAsInactiveUserResolver,
    signIn: signInResolver,
    signInAsUser: signInAsUserResolver,
    forgotPassword: forgotPasswordResolver,
    resetPassword: resetPasswordResolver,
    confirmEmail: confirmEmailResolver,
    sendConfirmEmailLink: sendConfirmEmailLinkResolver,
    logOut: logOutResolver,
    logOutFromUser: logOutFromUserResolver,
    socialSignUp: socialSignUpResolver,
    socialSignUpAsInactiveUser: socialSignUpAsInactiveUserResolver,
    updateProfileContacts: updateProfileContactsResolver,
    uploadCvFile: uploadUserCvResolver,
    removeCvFile: removeUserCvResolver,
    uploadAvatar: uploadAvatarResolver,
    setNftAvatar: setNftAvatarResolver,
    changePassword: changePasswordResolver,
    createUser: createUserResolver,
  },

  User: {
    primaryProfile: primaryProfileResolver,
    isAuthUser: isAuthUserResolver,
    profileConnections: profileConnectionsResolver,
    hires: hiresResolver,
    unreadMessagesCount: userUnreadMessagesCountResolver,
    cv: userCvResolver,
    avatar: avatarResolver,
    searchSubscriptions: usersSearchSubscriptionsResolver,
    messageTemplates: userMessageTemplatesResolver,
    isFirstTimeFillingCandidateProfile:
      isFirstTimeFillingCandidateProfileResolver,
    isFirstTimeFillingRecruiterProfile:
      isFirstTimeFillingRecruiterProfileResolver,
    settings: userSettingsResolver,
    adminSettings: adminSettingsResolver,
    hasVacanciesSource: hasVacanciesSourceResolver,
    nfts: usersNftsResolver,
  },
};
