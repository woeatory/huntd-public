import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';
import { UserMetaFields, UserWithToken } from '@/modules/user/user.typedefs';
import { AccessToken } from '@/models/AccessToken';
import { UserEntity } from '@/modules/user/User.entity';

export type SignUpUseCaseOptions = Pick<User, UserMetaFields | 'email' | 'password' | 'phone' | 'firstName' | 'lastName'> & {
  repeatPassword: string;
};

export type SignUpUseCaseResult = UserWithToken;

type Options = SignUpUseCaseOptions;
type Result = SignUpUseCaseResult;

export class SignUpUseCase extends UseCase<Options, Result> {
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
    };
  }

  protected async run(options: Options): Promise<Result> {
    const user = this.authUser || await User.create(options);

    const userEntity = new UserEntity(user);

    const accessToken = userEntity.generateAccessToken();

    await user.$create(AccessToken.name, { token: accessToken });

    Object.assign(user, {
      accessToken,
      created: !this.authUser,
    });

    return user as UserWithToken;
  }
}
