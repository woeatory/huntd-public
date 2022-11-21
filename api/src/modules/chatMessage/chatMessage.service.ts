import { ClientError, ClientErrorTypes } from '@mate-academy/core';
import { AuthService } from '@/core/Service';
import { ProfileConnectionEntity } from '../profileConnection/ProfileConnection.entity';
import { ChatMessageErrors, ChatMessageEvents } from './chatMessage.constants';
import { UserUnreadMessagesCountUpdatedPayload } from '../user/user.resolvers/userUnreadMessagesCountUpdated.resolver';
import { UserEvents } from '../user/user.events';
import { ProfileConnectionUpdatedSubscriptionPayload } from '../profileConnection/profileConnection.resolvers/profileConnectionUpdated.resolver';
import { ProfileConnectionEvents } from '../profileConnection/profileConnection.constants';
import { NewMessageSubscriptionPayload } from './chatMessage.resolvers/newMessage.resolver';
import { PushNotificationTypes } from '../notifications/notifications.typedefs';
import { NotificationsService } from '../notifications/notifications.service';
import { ChatMessageRepository } from './chatMessage.repository';

interface Options {
  profileConnectionId: number,
  message: string
}

export class ChatMessageService extends AuthService {
  private readonly notificationsService = this.makeService(
    NotificationsService,
  );

  private readonly chatMessageRepository = this.makeRepository(
    ChatMessageRepository,
  )

  async sendMessage({
    profileConnectionId,
    message,
  }: Options) {
    const profileConnection = await this.models.ProfileConnection.findByPk(
      profileConnectionId,
    );

    if (!profileConnection) {
      throw new ClientError({
        message: ChatMessageErrors.ProfileConnectionNotFound,
        type: ClientErrorTypes.NotFound,
      });
    }

    const candidateProfile = await this.models.CandidateProfile.findByPk(
      profileConnection.candidateProfileId,
    );

    const profileConnectionEntity = new ProfileConnectionEntity(
      profileConnection, this.authUser,
    );

    if (!(
      profileConnectionEntity.isUserCandidate
      || profileConnectionEntity.isUserRecruiter
    )) {
      throw new ClientError({
        message: ChatMessageErrors.ConnectionNotOwnedByUser,
        type: ClientErrorTypes.Forbidden,
      });
    }

    const recipientUserId = profileConnectionEntity.isUserCandidate
      ? profileConnection.recruiterUserId
      : profileConnection.candidateUserId;

    const chatMessage = await this.chatMessageRepository.createMessage({
      profileConnectionId,
      recipientUserId,
      message,
      senderUserId: this.authUser.id,
    });

    await profileConnectionEntity.updateLastActionTime();

    this.pubSub.publish<UserUnreadMessagesCountUpdatedPayload>(
      UserEvents.UserUnreadMessagesCountUpdated,
      {
        userUnreadMessagesCountUpdated: await this.models.User.findByPk(
          recipientUserId,
        ),
      },
    );

    this.pubSub.publish<UserUnreadMessagesCountUpdatedPayload>(
      UserEvents.UserUnreadMessagesCountUpdated,
      {
        userUnreadMessagesCountUpdated: this.authUser,
      },
    );

    this.pubSub.publish<ProfileConnectionUpdatedSubscriptionPayload>(
      ProfileConnectionEvents.ProfileConnectionUpdated,
      {
        profileConnectionUpdated: profileConnection,
      },
    );

    this.pubSub.publish<NewMessageSubscriptionPayload>(
      ChatMessageEvents.NewChatMessageSent,
      {
        newMessage: chatMessage,
      },
    );

    this.notificationsService.sendUserPushNotification({
      userId: recipientUserId,
      title: profileConnectionEntity.shouldHideCandidateName
        ? candidateProfile?.position || 'Hidden contact'
        : this.authUser.computedName,
      body: chatMessage.message,
      payload: {
        profileConnectionId,
        type: PushNotificationTypes.ChatMessage,
      },
    });

    return chatMessage;
  }
}
