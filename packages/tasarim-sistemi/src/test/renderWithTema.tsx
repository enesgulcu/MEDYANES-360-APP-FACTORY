import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { TemaSaglayici, type TemaModu } from '../bilesenler/TemaSaglayici';
import { VARSAYILAN_TEMA } from '../tema';

/** Bileşen testlerinde tema bağlamını otomatik sarar. */
export function renderWithTema(
  ui: ReactElement,
  mod: TemaModu = 'light',
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(
    <TemaSaglayici tema={VARSAYILAN_TEMA} mod={mod}>
      {ui}
    </TemaSaglayici>,
    options,
  );
}
