import { ClientError, ClientErrorLevels } from '@mate-academy/core';
import { Repository } from '@/core/Repository';
import { UserMessagesTemplate } from '@/models/UserMessagesTemplate';

export class UserMessagesTemplateRepository extends Repository {
  async createTemplate(options: {
    userId: number;
    messageTitle: string;
    messageBody: string;
    messageType: string;
  }) {
    const {
      userId, messageTitle, messageBody, messageType,
    } = options;

    return this.models.UserMessagesTemplate.create({
      userId,
      messageTitle,
      messageBody,
      messageType,
    },
    { raw: true });
  }

  async deleteTemplate({ id }: { id: number }) {
    return this.models.UserMessagesTemplate.destroy({
      where: { id },
    });
  }

  async updateTemplate(options: {
    id: number;
    messageTitle?: string;
    messageBody?: string;
  }) {
    const { id, messageTitle, messageBody } = options;

    const [count, updatedTemplates] = await this.models.UserMessagesTemplate
      .update(
        { messageTitle, messageBody },
        {
          where: { id },
          returning: true,
        },
      );

    if (count === 0) {
      throw new ClientError({
        level: ClientErrorLevels.Error,
        message: 'Can\'t update message template',
      });
    }

    return updatedTemplates[0].get() as UserMessagesTemplate;
  }
}
