import { User as UserModel } from '@/models/User';

export type UserMetaFields = 'fvType' | 'fvSource' | 'fvMedium' | 'fvCampaign'
  | 'fvContent' | 'fvTerm' | 'lvType' | 'lvSource' | 'lvMedium' | 'lvCampaign'
  | 'lvContent' | 'lvTerm' | 'gClientid' | 'gIp' | 'gAgent' | 'gclid';

export interface UserWithToken extends UserModel {
    accessToken: string;
}

export enum UpdateProfileContactsErrors {
  BadEthWalletAddress = 'BAD_ETH_WALLET_ADDRESS',
}

export enum UserRoleEnum {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum PrimaryProfileEnum {
  Recruiter = 'RECRUITER',
  Candidate = 'CANDIDATE',
  NotDefined = 'NOT_DEFINED'
}

export enum UploadFileErrors {
  WrongFileFormat = 'wrong_file_format',
}
