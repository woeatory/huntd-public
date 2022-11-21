declare module 'react-native-config' {
  interface Env {
    // Core
    API_ENDPOINT: string;
    WS_API_ENDPOINT: string;
    AMPLITUDE_KEY: string
    IMAGE_HANDLER_ENDPOINT: string;

    // oAUTH
    GOOGLE_GUID_EXPO_CLIENT: string;
    GOOGLE_GUID_IOS_CLIENT: string;
    GOOGLE_GUID_ANDROID_CLIENT: string;

    GOOGLE_API_KEY: string;
  }

  const BuildConfig: Env;

  export default BuildConfig;
}
