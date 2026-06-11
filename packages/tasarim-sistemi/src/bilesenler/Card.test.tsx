import { Text } from 'react-native';
import { Card } from './Card';
import { renderWithTema } from '../test/renderWithTema';

describe('Card', () => {
  it('baslik ve icerigi gosterir', () => {
    const { getByText } = renderWithTema(
      <Card baslik="Baslik">
        <Text>Icerik metni</Text>
      </Card>,
    );
    expect(getByText('Baslik')).toBeTruthy();
    expect(getByText('Icerik metni')).toBeTruthy();
  });

  it('aksiyon alanini render eder', () => {
    const { getByText } = renderWithTema(
      <Card baslik="Kart" aksiyon={<Text>Aksiyon</Text>}>
        <Text>Govde</Text>
      </Card>,
    );
    expect(getByText('Aksiyon')).toBeTruthy();
  });
});
