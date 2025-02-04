import { render, screen } from '@testing-library/angular';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import { DisplayAmountValueComponent } from './display-amount-value.component';

describe('DisplayAmountValueComponent', () => {
  it.each([
    { amount: 128000, formattedAmount: '12' },
    { amount: 1280000, formattedAmount: '128' },
    { amount: 12825000, formattedAmount: '1,282' },
  ])('万の位を切り捨てたフォーマット済みの値が表示されるか', async ({ amount, formattedAmount }) => {
    await render(DisplayAmountValueComponent, {
      inputs: { compoundInterestCalcResult: amount },
      imports: [TruncateToTenThousandsPipe],
    });

    const spanElement = screen.getByText(formattedAmount);
    expect(spanElement).toBeTruthy();
  });
});
