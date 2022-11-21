import { AppEnvironments, ValidationRules } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { NewVacancyApplication } from '@/modules/candidateProfile/candidateProfile.notificationTypes';
import { getHostUrl } from '@/helpers/getHostUrl';

export interface SendNewVacancyApplicationUseCaseOptions {
  companyName: string;
  jobTitle: string;
}
export type SendNewVacancyApplicationUseCaseResult = boolean;

type Options = SendNewVacancyApplicationUseCaseOptions;
type Result = SendNewVacancyApplicationUseCaseResult;

export class SendNewVacancyApplicationUseCase extends AuthUseCase<
  Options,
  Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      companyName: ['required', 'string'],
      jobTitle: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const slackChannel = process.env.APP_ENV === AppEnvironments.Production
      ? 'huntd_jobs'
      : 'huntd_profiles_development';

    this.gateways.notifications.notify<NewVacancyApplication>({
      user_id: this.authUser.id,
      notification_uid: `new_vacancy_application|${Date.now()}`,
      channel: this.gateways.notifications.channels.Slack,
      notification_type: 'NEW_VACANCY_APPLICATION',
      message_data: {
        subject: this.authUser.computedName,
        destination: slackChannel,
        icon: ':huntd-icon:',
        user_name: this.authUser.computedName,
        email: this.authUser.email,
        job_title: options.jobTitle,
        company_name: options.companyName,
        impersonate_login_link: `${getHostUrl()}/sign-in-as-user?email=${this.authUser.email}`,
      },
    });

    return true;
  }
}
