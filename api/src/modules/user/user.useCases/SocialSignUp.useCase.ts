import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { User } from '@/models/User';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { AccessToken } from '@/models/AccessToken';
import { UserEntity } from '@/modules/user/User.entity';
import { MutationSocialSignUpArgs } from '@/graphql/generated';
import { OAuthToken } from '@/models/OAuthToken';

export type SocialSignUpUseCaseOptions = MutationSocialSignUpArgs;
export type SocialSignUpUseCaseResult = UserWithToken;

type Options = SocialSignUpUseCaseOptions;
type Result = SocialSignUpUseCaseResult;

interface UserWhereOption {
  [key: string]: string | number;
}

export class SocialSignUpUseCase extends UseCase<Options, Result> {
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
    };
  }

  protected async run(options: Options): Promise<Result> {
    const {
      providerId, providerName, token, email, ...userOptions
    } = options;

    let user = this.authUser;
    let isUserCreated = false;

    const oAuthToken = await OAuthToken.findOne({
      where: {
        providerId,
        providerName,
      },
    });

    if (!user) {
      const userWhereOptions: UserWhereOption = oAuthToken
        ? {
          id: oAuthToken.userId,
        } : {
          email: UserEntity.formatEmail(email),
        };

      const [processedUser, created] = await User.findOrCreate({
        where: {
          ...userWhereOptions,
        },
      });

      isUserCreated = created;

      user = processedUser as UserWithToken;
    }

    const userEntity = new UserEntity(user);

    const accessToken = userEntity.generateAccessToken();

    await user.$create(AccessToken.name, { token: accessToken });

    if (isUserCreated) {
      await user.update({
        ...userOptions,
      });
    }

    if (!oAuthToken) {
      try {
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

    Object.assign(user, {
      accessToken,
      created: isUserCreated,
    });

    return user;
  }
}
