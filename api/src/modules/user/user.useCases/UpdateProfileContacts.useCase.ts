import { ValidationRules, ClientError, ClientErrorTypes } from '@mate-academy/core';
import { UserEntity } from '@/modules/user/User.entity';
import { User } from '@/models/User';
import { AuthUseCase } from '@/core';
import { WITHOUT_WALLET_ADDRESS } from '@/modules/user/user.constants';
import { UpdateProfileContactsErrors } from '../user.typedefs';

export interface UpdateProfileContactsUseCaseOptions {
  phone: string;
  firstName: string;
  lastName: string;
  linkedinUrl: string;
  behanceUrl: string;
  githubUrl: string;
  ethWalletAddress: string;
}
export type UpdateProfileContactsUseCaseResult = User;

type Options = UpdateProfileContactsUseCaseOptions;
type Result = UpdateProfileContactsUseCaseResult;

export class UpdateProfileContactsUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      behanceUrl: ['string'],
      githubUrl: ['string'],
      linkedinUrl: ['string'],
      firstName: ['string'],
      lastName: ['string'],
      phone: ['string'],
      ethWalletAddress: ['string'],
    };
  }

  protected async run(options: Options): Promise<Result> {
    const userEntity = new UserEntity(this.authUser);
    const { ethWalletAddress } = options;

    const withWalletAddress = ethWalletAddress !== WITHOUT_WALLET_ADDRESS;

    if (withWalletAddress && (ethWalletAddress
      && !userEntity.validateEthWalletAddress(ethWalletAddress)
    )) {
      throw new ClientError({
        type: ClientErrorTypes.BadRequest,
        message: UpdateProfileContactsErrors.BadEthWalletAddress,
      });
    }

    return this.authUser.update({
      ...options,
      ethWalletAddress: withWalletAddress ? ethWalletAddress : null,
    });
  }
}
