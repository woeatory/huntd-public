export interface PushNotificationOptions {
  title: string;
  body: string;
  payload?: Record<string, any>;
}

export type SendUserPushNotificationsOptions = {
  userId: number;
} & PushNotificationOptions;

export type SendPushNotificationsOptions = {
  target: PushNotificationTarget;
} & PushNotificationOptions

export interface PushNotificationTarget {
  candidates?: boolean;
  recruiters?: boolean;
}

export enum PushNotificationTypes {
  ChatMessage = 'CHAT_MESSAGE',
  Custom = 'CUSTOM',
}
