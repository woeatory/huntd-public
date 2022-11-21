import { AppEnvironments, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { NewVacancyRequest } from '@/modules/candidateProfile/candidateProfile.notificationTypes';
import { getHostUrl } from '@/helpers/getHostUrl';

export type SendNewVacancyRequestUseCaseOptions = {
  vacancyLink: string;
  contactEmail: string;
};
export type SendNewVacancyRequestUseCaseResult = boolean;

type Options = SendNewVacancyRequestUseCaseOptions;
type Result = SendNewVacancyRequestUseCaseResult;

export class SendNewVacancyRequestUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      vacancyLink: ['required', 'string'],
      contactEmail: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const slackChannel = process.env.APP_ENV === AppEnvironments.Production
      ? 'huntd_jobs'
      : 'huntd_profiles_development';

    this.gateways.notifications.notify<NewVacancyRequest>({
      user_id: this.authUser.id,
      notification_uid: `new-vacancy_request|${Date.now()}`,
      channel: this.gateways.notifications.channels.Slack,
      notification_type: 'NEW_VACANCY_REQUEST',
      message_data: {
        subject: this.authUser.computedName,
        destination: slackChannel,
        icon: ':huntd-icon:',
        user_name: this.authUser.computedName,
        email: this.authUser.email,
        impersonate_login_link: `${getHostUrl()}/sign-in-as-user?email=${this.authUser.email}`,
        vacancy_link: options.vacancyLink,
        contact_email: options.contactEmail,
      },
    });

    return true;
  }
}
