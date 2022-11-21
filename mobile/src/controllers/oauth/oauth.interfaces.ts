export interface GoogleApiUserInfo {
  id: string;
  email: string;
  name: string;
  family_name: string;
  given_name: string;
  verified_email: true;
  locale?: string;
}
