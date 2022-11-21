import { Cta, Maybe } from '@/controllers/graphql/generated';

export enum AlertMessageType {
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING',
  Error = 'ERROR'
}

export type AlertMessage = {
  type: AlertMessageType;
  heading: string;
  text: string;
  cta?: Maybe<Cta>;
};
