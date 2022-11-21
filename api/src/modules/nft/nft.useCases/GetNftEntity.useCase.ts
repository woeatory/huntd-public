import { ValidationRules } from '@mate-academy/core';
import { UseCase } from '@/core';
import { UploadFileMorphRepository } from '@/modules/uploadFileMorph/uploadFileMorph.repository';
import { RelatedTypes } from '@/modules/uploadFileMorph/uploadFileMorph.typedefs';

export interface GetNftEntityUseCaseOptions {
  nftId: number;
}
export type GetNftEntityUseCaseResult = any;

type Options = GetNftEntityUseCaseOptions;
type Result = GetNftEntityUseCaseResult;

export class GetNftEntityUseCase extends UseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> {
    return {
      nftId: ['required', 'positive_integer'],
    };
  }

  uploadFileMorphRepository = this.makeRepository(
    UploadFileMorphRepository,
  );

  protected async run(options: Options): Promise<Result> {
    return this.uploadFileMorphRepository.findByRelatedTypeAndId(
      RelatedTypes.Nfts, options.nftId,
    );
  }
}
