import { provideZonelessChangeDetection } from '@angular/core';

import { render, screen } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';

import { LabelTextComponent } from './label-text.component';

describe('LabelTextComponent', () => {
  it('isRequiredがtrueの場合、ラベルが*付きで表示されるか', async () => {
    await render(LabelTextComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { id: 'id', isRequired: true },
    });

    const label = screen.queryByText('*');
    expect(label).toBeTruthy();
  });

  it('isRequiredがfalseの場合、ラベルが*なしで表示されるか', async () => {
    await render(LabelTextComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { id: 'id', isRequired: false },
    });

    const label = screen.queryByText('*');
    expect(label).toBeFalsy();
  });
});
