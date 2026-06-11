import type { AppInfo } from '@medyanes360/cekirdek';
import { createMockAnalitik } from './client';

const testApp: AppInfo = {
  appId: 'com.medyanes360.testapp',
  appVersion: '1.0.0',
  platform: 'ios',
};

describe('createMockAnalitik', () => {
  it('geçerli olayı kaydeder', () => {
    const istemci = createMockAnalitik(testApp);
    istemci.logEvent('app_open', { kaynak: 'push' });
    expect(istemci.kayitlar).toHaveLength(1);
    expect(istemci.kayitlar[0]?.olay).toBe('app_open');
  });

  it('userId atandıktan sonra olaylara işlenir', () => {
    const istemci = createMockAnalitik(testApp);
    istemci.setUserId('anon-123');
    istemci.logEvent('screen_view');
    expect(istemci.kayitlar[0]?.userId).toBe('anon-123');
  });

  it('geçersiz olay adını kaydetmez ama uygulamayı da çökertmez', () => {
    const istemci = createMockAnalitik(testApp);
    istemci.logEvent('Geçersiz Olay Adı!');
    expect(istemci.kayitlar).toHaveLength(0);
  });
});
