export enum UserEvents {
  SignedUp = 'USER_SIGNED_UP',
  UserUnreadMessagesCountUpdated = 'USER_UNREAD_MESSAGES_COUNT_UPDATED'
}

export interface UserEventsPayload {
  id: number;
}
