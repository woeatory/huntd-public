import { ValidationRules, ClientError, ClientErrorLevels } from '@mate-academy/core';
import { OAuthProvidersEnum } from '@/./modules/oauth/oauth.typedefs';
import { AuthUseCase } from '@/core';

export interface DisconnectOAuthProviderUseCaseOptions {
  provider: OAuthProvidersEnum;
}
export type DisconnectOAuthProviderUseCaseResult = boolean;

type Options = DisconnectOAuthProviderUseCaseOptions;
type Result = DisconnectOAuthProviderUseCaseResult;

export class DisconnectOAuthProviderUseCase extends AuthUseCase<
  Options, Result
> {
  protected get validation(): ValidationRules<Options> {
    return {
      provider: ['string', 'required', 'to_uc'],
    };
  }

  protected async run({ provider }: Options): Promise<Result> {
    try {
      await this.models.OAuthToken.destroy({
        where: {
          providerName: provider,
          userId: this.authUser.id,
        },
      });

      return true;
    } catch (error) {
      throw new ClientError({
        level: ClientErrorLevels.Error,
        error,
        message: 'Can\'t disconnect oAuth provider',
        fields: { provider },
      });
    }
  }
}
