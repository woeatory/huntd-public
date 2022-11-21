export const SERVICE_TOKEN_NAME = 'x-service-token';
export const ACCESS_TOKEN_NAME = 'x-token';
export const ADMIN_TOKEN_NAME = 'x-admin-token';
export const RESET_PASSWORD_PATH = 'reset-password';
export const RESET_PASSWORD_INVALID_TOKEN = 'reset_password_invalid_token';
export const FORGOT_PASSWORD_INVALID_EMAIL = 'forgot_password_invalid_email';
export const CONFIRM_EMAIL_PATH = 'confirm-email';
export const CONFIRM_EMAIL_INVALID_TOKEN = 'confirm_email_invalid_token';

export const PROFILE_PATH = 'profile';

// TODO: move all errors to ENUM
export enum AuthErrors {
  UserNotAdmin = 'user_not_admin',
  LoginInvalidCredentials = 'login_invalid_credentials',
  RegisterEmailAlreadyTaken = 'register_email_already_taken',
  LoginNotAuthorized = 'login_not_authorized',
  Forbidden = 'forbidden',
}
