import { fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import { renderWithTema } from '../test/renderWithTema';

describe('Button', () => {
  it('baslik metnini gosterir', () => {
    const { getByRole } = renderWithTema(<Button baslik="Devam et" onPress={() => undefined} />);
    expect(getByRole('button', { name: 'Devam et' })).toBeTruthy();
  });

  it('basildiginda onPress cagrilir', () => {
    const onPress = jest.fn();
    const { getByRole } = renderWithTema(<Button baslik="Kaydet" onPress={onPress} />);
    fireEvent.press(getByRole('button', { name: 'Kaydet' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('yukleniyor iken basilmaz', () => {
    const onPress = jest.fn();
    const { getByRole } = renderWithTema(<Button baslik="Bekle" onPress={onPress} yukleniyor />);
    fireEvent.press(getByRole('button', { name: 'Bekle' }));
    expect(onPress).not.toHaveBeenCalled();
  });
});
