import { ValidationRules, ClientError, ClientErrorLevels } from '@mate-academy/core';
import { AuthUseCase } from '@/core';
import { OAuthProvidersEnum } from '@/./modules/oauth/oauth.typedefs';

export interface ConnectOAuthProviderUseCaseOptions {
  provider: OAuthProvidersEnum;
  token: string;
  id: string;
}
export type ConnectOAuthProviderUseCaseResult = boolean;

type Options = ConnectOAuthProviderUseCaseOptions;
type Result = ConnectOAuthProviderUseCaseResult;

export class ConnectOAuthProviderUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      provider: ['string', 'required', 'to_uc'],
      token: ['string', 'required'],
      id: ['string', 'required'],
    };
  }

  protected async run({ token, id, provider }: Options): Promise<Result> {
    try {
      await this.models.OAuthToken.create({
        token,
        providerName: provider,
        providerId: id,
        userId: this.authUser?.id,
      });

      return true;
    } catch (error) {
      throw new ClientError({
        level: ClientErrorLevels.Error,
        error,
        message: 'Can\'t connect oAuth provider',
        fields: { provider },
      });
    }
  }
}
