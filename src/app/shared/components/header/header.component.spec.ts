import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('data-drawer-target="logo-sidebar" 属性を持つボタンがあるか', async () => {
    await render(HeaderComponent);

    const button = screen.getByRole('button', { name: 'open sidebar' });

    expect(button.getAttribute('data-drawer-target')).toBe('logo-sidebar');
  });

  it('data-drawer-toggle="logo-sidebar" 属性を持つボタンがあるか', async () => {
    await render(HeaderComponent);

    const button = screen.getByRole('button', { name: 'open sidebar' });

    expect(button.getAttribute('data-drawer-toggle')).toBe('logo-sidebar');
  });
});
