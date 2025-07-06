import { provideZonelessChangeDetection } from '@angular/core';

import { render, screen } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';

import { HeadContentComponent } from './head-content.component';

describe('HeadContentComponent', () => {
  it('タイトルが期待通りに表示されるか', async () => {
    const title = 'タイトル';
    await render(HeadContentComponent, {
      providers: [provideZonelessChangeDetection()],
      inputs: { title, hasDescription: false },
    });

    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe(title);
  });
});
