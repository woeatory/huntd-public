import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStore from '@react-native-async-storage/async-storage';
import { DevicePlatform } from '@/controllers/graphql/generated';

export class ClientStorage {
  private static isAndroid() {
    return Platform.OS === DevicePlatform.Android.toLowerCase();
  }

  static async setItem(key: string, value: string): Promise<void> {
    if (this.isAndroid()) {
      await AsyncStore.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    if (this.isAndroid()) {
      return AsyncStore.getItem(key);
    }

    const secureStoreValue = await SecureStore.getItemAsync(key);

    return secureStoreValue || AsyncStore.getItem(key);
  }

  static async removeItem(key: string): Promise<void> {
    if (this.isAndroid()) {
      await AsyncStore.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
}
