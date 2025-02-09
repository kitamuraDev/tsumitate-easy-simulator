import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BaseButtonComponent } from './base-button.component';

describe('BaseButtonComponent', () => {
  it('ボタン押下でクリックイベントが発火されるか', async () => {
    const user = userEvent.setup();
    const clickEvent = jest.fn();

    await render(BaseButtonComponent, { on: { clickEvent } });
    await user.click(screen.getByRole('button'));

    expect(clickEvent).toHaveBeenCalled();
  });

  it('活性状態の場合、ボタンを押下できるか', async () => {
    const user = userEvent.setup();
    const clickEvent = jest.fn();

    await render(BaseButtonComponent, { inputs: { isDisabled: false }, on: { clickEvent } });
    const button = screen.getByRole('button');

    expect(button).toBeEnabled(); // 活性であるか
    await user.click(button);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('非活性状態の場合、ボタンを押下できないか', async () => {
    const user = userEvent.setup();
    const clickEvent = jest.fn();

    await render(BaseButtonComponent, { inputs: { isDisabled: true }, on: { clickEvent } });
    const button = screen.getByRole('button');

    expect(button).toBeDisabled(); // 非活性であるか
    await user.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('活性状態の場合、期待通りのクラスが適用されているか', async () => {
    await render(BaseButtonComponent, { inputs: { isDisabled: false } });

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-blue-500', 'hover:opacity-70');
  });

  it('非活性状態の場合、期待通りのクラスが適用されているか', async () => {
    await render(BaseButtonComponent, { inputs: { isDisabled: true } });

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-blue-500', 'bg-opacity-40', 'cursor-not-allowed');
  });
});
