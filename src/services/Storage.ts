import AsyncStorage from '@react-native-community/async-storage';
import ToastError from '../utils/ToastError';

const StorageStore = {
  async setStorage(key: string, value: any) {
    try {
      await AsyncStorage.setItem(`@APP_NAME:${key}`, JSON.stringify(value));
    } catch (e: any) {
      ToastError(e);
      throw e;
    }
  },

  async getStorage(key: string) {
    try {
      const dado = await AsyncStorage.getItem(`@APP_NAME:${key}`);
      return dado !== null && dado.length > 0 ? JSON.parse(dado) : null;
    } catch (e: any) {
      ToastError(e);
      throw e;
    }
  },

  async removeStorage(key: string) {
    try {
      await AsyncStorage.removeItem(`@APP_NAME:${key}`);
    } catch (e: any) {
      ToastError(e);
      throw e;
    }
  },

  async clearStorage() {
    try {
      await AsyncStorage.clear();
    } catch (e: any) {
      ToastError(e);
      throw e;
    }
  },
};

export default StorageStore;
