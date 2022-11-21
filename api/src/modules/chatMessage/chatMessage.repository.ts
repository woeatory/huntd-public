import { Repository } from '@/core/Repository';
import { ChatMessage } from '@/models/ChatMessage';
import { ChatMessageErrors } from '@/modules/chatMessage/chatMessage.constants';

interface CreateMessageOptions {
  profileConnectionId: number;
  senderUserId: number;
  recipientUserId: number;
  message: string;
}

interface SystemMessageOptions {
  profileConnectionId: number;
  message: string;
}

export class ChatMessageRepository extends Repository {
  async updateMessage(
    id: number,
    values: {
      message: string,
    },
  ): Promise<ChatMessage> {
    const [count, updatedValues] = await this.models.ChatMessage.update(
      values,
      {
        where: { id },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(ChatMessageErrors.MessageNotFound);
    }

    return updatedValues[0].get({ plain: true }) as ChatMessage;
  }

  async createMessage({
    profileConnectionId,
    senderUserId,
    recipientUserId,
    message,
  }: CreateMessageOptions) {
    return this.models.ChatMessage.create({
      profileConnectionId,
      recipientUserId,
      message,
      senderUserId,
    });
  }

  async createSystemMessage({
    profileConnectionId,
    message,
  }: SystemMessageOptions) {
    return this.models.ChatMessage.create({
      profileConnectionId,
      message,
    });
  }
}
