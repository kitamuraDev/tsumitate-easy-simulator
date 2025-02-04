import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  it('ボタン押下でクリックイベントが発火されるか', async () => {
    const user = userEvent.setup();
    const clickEvent = jest.fn();

    await render(ToggleButtonComponent, { on: { clickEvent } });
    await user.click(screen.getByRole('button'));

    expect(clickEvent).toHaveBeenCalled();
  });

  it('開いている状態の場合、期待通りのクラスが適用されているか', async () => {
    const { container } = await render(ToggleButtonComponent, {
      inputs: { isOpen: true },
    });

    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList).toContain('rotate-180');
  });

  it('閉じている状態の場合、期待通りのクラスが適用されているか', async () => {
    const { container } = await render(ToggleButtonComponent, {
      inputs: { isOpen: false },
    });

    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList).toContain('rotate-90');
  });
});
