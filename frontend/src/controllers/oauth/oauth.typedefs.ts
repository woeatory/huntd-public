export interface AuthPopupMessage {
    payload: Record<string, any> | null;
    success: boolean;
    error?: string;
    type?: AuthMessageTypes
}

export enum AuthMessageTypes {
  OAuthPopupResponse = 'oauthProviderResponse',
}
