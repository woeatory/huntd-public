import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { AccessToken } from '@/models/AccessToken';
import { UserEntity } from '@/modules/user/User.entity';
import { UserRepository } from '@/modules/user/user.repository';
import { MutationSocialSignUpAsInactiveUserArgs } from '@/graphql/generated';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';

export type SocialSignUpAsInactiveUserUseCaseOptions = (
  MutationSocialSignUpAsInactiveUserArgs
  );
export type SocialSignUpAsInactiveUserUseCaseResult = UserWithToken;

type Options = SocialSignUpAsInactiveUserUseCaseOptions;
type Result = SocialSignUpAsInactiveUserUseCaseResult;

export class SocialSignUpAsInactiveUserUseCase extends UseCase<
  Options, Result
> {
  private readonly userRepository = this.makeRepository(
    UserRepository,
  );

  private readonly recruiterProfileRepository = this.makeRepository(
    RecruiterProfileRepository,
  );

  protected get validation(): ValidationRules<Options> {
    return {
      fvType: ['string'],
      fvSource: ['string'],
      fvMedium: ['string'],
      fvCampaign: ['string'],
      fvContent: ['string'],
      fvTerm: ['string'],
      lvType: ['string'],
      lvSource: ['string'],
      lvMedium: ['string'],
      lvCampaign: ['string'],
      lvContent: ['string'],
      lvTerm: ['string'],
      gClientid: ['string'],
      gIp: ['string'],
      gAgent: ['string'],
      gclid: ['string'],
      email: ['required', 'email', 'to_lc'],
      phone: ['string'],
      firstName: ['string'],
      lastName: ['string'],
      providerId: ['required', 'string'],
      providerName: ['required', 'string'],
      token: ['required', 'string'],
      username: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const {
      providerId, providerName, token, ...userOptions
    } = options;

    const user = await this.userRepository.findByUsername(options.username);

    if (user) {
      const userEntity = new UserEntity(user);

      const accessToken = userEntity.generateAccessToken();

      try {
        await user.$create(AccessToken.name, { token: accessToken });

        await user.update({
          inactive: false,
          ...userOptions,
        });

        Object.assign(user, {
          accessToken,
          created: true,
        });

        const recruiterProfile = await this.recruiterProfileRepository
          .getLatestRecruiterProfile({ userId: user.id });

        await this.recruiterProfileRepository.updateProfile(
          recruiterProfile.id,
          { status: RecruiterProfileStatusEnum.Active },
        );

        await this.models.OAuthToken.create({
          userId: user.id,
          providerId,
          providerName,
          token,
        });
      } catch (e) {
        this.logger.warning(e.message || e);
      }
    }

    return user as UserWithToken;
  }
}
