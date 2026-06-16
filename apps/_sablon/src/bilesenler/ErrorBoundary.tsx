import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@medyanes360/tasarim-sistemi';
import i18n from '../altyapi/i18n';
import { logger } from '../altyapi/istemciler';

interface Props {
  children: ReactNode;
  onYenidenDene?: () => void;
}

interface State {
  hata: Error | null;
}

/**
 * Beklenmeyen render hatalarını yakalar; uygulama beyaz ekranda kalmaz.
 * Metinler çeviri dosyasından (i18n.t — class bileşende hook kullanılamaz).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hata: null };

  static getDerivedStateFromError(hata: Error): State {
    return { hata };
  }

  componentDidCatch(hata: Error, bilgi: ErrorInfo): void {
    logger.logError(hata, `error-boundary: ${bilgi.componentStack?.slice(0, 200) ?? ''}`);
  }

  yenidenDene = (): void => {
    this.setState({ hata: null });
    this.props.onYenidenDene?.();
  };

  render(): ReactNode {
    if (this.state.hata !== null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>{i18n.t('hata.sinir.baslik')}</Text>
          <Text style={{ color: '#64748B' }}>{i18n.t('hata.sinir.aciklama')}</Text>
          <Button
            baslik={i18n.t('hata.sinir.yenidenDene')}
            onPress={this.yenidenDene}
            testID="error-yeniden-dene"
          />
        </View>
      );
    }
    return this.props.children;
  }
}
