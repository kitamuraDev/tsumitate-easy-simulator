import { Component, Input } from '@angular/core';
import { Tsumitate } from '../../../shared/types/tsumitate';

@Component({
  selector: 'app-display-amount-value',
  standalone: true,
  imports: [],
  template: `
    <span class="text-2xl font-semibold">
      {{ formatAmount(tsumitate.output.compoundInterestCalcResult) }}
    </span>
  `,
})
export class DisplayAmountValueComponent {
  @Input({ required: true }) tsumitate!: Tsumitate;

  formatAmount(amount: number) {
    const roundedDownToTenThousand = Math.floor(amount / 10000); // 万の位以下を切り捨て

    return roundedDownToTenThousand.toLocaleString();
  }
}
