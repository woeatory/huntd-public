import { ChatMessage } from '@/models/ChatMessage';
import { User } from '@/models/User';

export class ChatMessageEntity {
  constructor(
    private chatMessage: ChatMessage,
    private user: User,
  ) {}

  get isUserSender() {
    return this.user.id === this.chatMessage.senderUserId;
  }
}
