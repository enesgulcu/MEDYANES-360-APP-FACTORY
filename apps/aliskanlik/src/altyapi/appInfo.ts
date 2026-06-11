import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type { AppInfo } from '@medyanes360/cekirdek';

/**
 * Uygulama kimliği: loglama ve analitik olayları bu bilgiyle etiketlenir.
 * Yeni uygulama açarken appId, app.json'daki bundle ID ile birlikte güncellenir.
 */
export const APP_INFO: AppInfo = {
  appId: 'com.medyanes360.aliskanlik',
  appVersion: Constants.expoConfig?.version ?? '1.0.0',
  // Web önizlemesi geliştirme kolaylığıdır; mağaza hedefi ios/android'dir.
  platform: Platform.OS === 'ios' ? 'ios' : 'android',
};
