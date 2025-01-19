import { Component, Input } from '@angular/core';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';

@Component({
  selector: 'app-display-amount-value',
  imports: [TruncateToTenThousandsPipe],
  template: `
    <span class="text-2xl font-semibold">
      {{ compoundInterestCalcResult | truncateToTenThousands }}
    </span>
  `,
})
export class DisplayAmountValueComponent {
  @Input({ required: true }) compoundInterestCalcResult!: number;
}
