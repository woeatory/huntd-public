export enum ChatMessageErrors {
  CantSendMessageToSameUser = 'cant_send_message_to_same_user',
  ProfileConnectionNotFound = 'profile_connection_not_found',
  ConnectionNotOwnedByUser = 'connection_not_owned_by_user',
  MessageUserNotFound = 'message_user_not_found',
  MessageNotFound = 'message_not_found',
}

export enum ChatMessageEvents {
  NewChatMessageSent = 'new_chat_message_sent'
}
