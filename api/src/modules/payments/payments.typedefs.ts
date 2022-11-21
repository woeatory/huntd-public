export interface UserInfo {
  email: string;
  slug: string;
}

export interface SendPaymentRequestToTrelloOptions {
  paymentAmount: number;
  candidateSlug: string;
  user: UserInfo;
  profileConnectionId: number;
}
