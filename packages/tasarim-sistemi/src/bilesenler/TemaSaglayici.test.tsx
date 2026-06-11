import { Text, useColorScheme } from 'react-native';
import { render } from '@testing-library/react-native';
import { TemaSaglayici, useTema } from './TemaSaglayici';
import { VARSAYILAN_TEMA } from '../tema';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(() => 'light'),
}));

function ModGostergesi() {
  const { mod, renkler } = useTema();
  return (
    <>
      <Text testID="mod">{mod}</Text>
      <Text testID="zemin">{renkler.zemin}</Text>
    </>
  );
}

describe('TemaSaglayici', () => {
  it('mod=light acik paleti kullanir', () => {
    const { getByTestId } = render(
      <TemaSaglayici tema={VARSAYILAN_TEMA} mod="light">
        <ModGostergesi />
      </TemaSaglayici>,
    );
    expect(getByTestId('mod').props.children).toBe('light');
    expect(getByTestId('zemin').props.children).toBe(VARSAYILAN_TEMA.renkler.light.zemin);
  });

  it('mod=dark koyu paleti kullanir', () => {
    const { getByTestId } = render(
      <TemaSaglayici tema={VARSAYILAN_TEMA} mod="dark">
        <ModGostergesi />
      </TemaSaglayici>,
    );
    expect(getByTestId('mod').props.children).toBe('dark');
    expect(getByTestId('zemin').props.children).toBe(VARSAYILAN_TEMA.renkler.dark.zemin);
  });

  it('mod=sistem cihaz karanligini izler', () => {
    jest.mocked(useColorScheme).mockReturnValue('dark');
    const { getByTestId } = render(
      <TemaSaglayici tema={VARSAYILAN_TEMA} mod="sistem">
        <ModGostergesi />
      </TemaSaglayici>,
    );
    expect(getByTestId('mod').props.children).toBe('dark');
    expect(getByTestId('zemin').props.children).toBe(VARSAYILAN_TEMA.renkler.dark.zemin);
  });
});
