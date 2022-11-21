import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';
import { UserMetaFields, UserWithToken } from '@/modules/user/user.typedefs';
import { AccessToken } from '@/models/AccessToken';
import { UserEntity } from '@/modules/user/User.entity';
import { UserRepository } from '@/modules/user/user.repository';
import { RecruiterProfileRepository } from '@/modules/recruiterProfile/recruiterProfile.repository';
import { RecruiterProfileStatusEnum } from '@/modules/recruiterProfile/recruiterProfile.typedefs';

export type SignUpAsInactiveUserUseCaseOptions = Pick<User, UserMetaFields | 'email' | 'password' | 'phone' | 'firstName' | 'lastName'> & {
  repeatPassword: string;
  username: string;
};

export type SignUpAsInactiveUserUseCaseResult = UserWithToken;

type Options = SignUpAsInactiveUserUseCaseOptions;
type Result = SignUpAsInactiveUserUseCaseResult;

export class SignUpAsInactiveUserUseCase extends UseCase<Options, Result> {
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
      password: ['required', 'string'],
      repeatPassword: ['required', 'string', { equal_to_field: 'password' }],
      phone: ['string'],
      firstName: ['string'],
      lastName: ['string'],
      username: ['required', 'string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = await this.userRepository.findByUsername(options.username);

    if (user) {
      const userEntity = new UserEntity(user);

      await user.update({
        ...options,
        password: await userEntity.generatePasswordHash(options.password),
        inactive: false,
      });

      const accessToken = userEntity.generateAccessToken();

      await user.$create(AccessToken.name, { token: accessToken });

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
    }

    return user as UserWithToken;
  }
}
