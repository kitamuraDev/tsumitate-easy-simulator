import { Component, Input, inject } from '@angular/core';
import { FormatService } from '../../../shared/services/format.service';

@Component({
  selector: 'app-display-amount-value',
  standalone: true,
  imports: [],
  template: `
    <span class="text-2xl font-semibold">
      {{ formatService.formatAmountToTenThousand(compoundInterestCalcResult) }}
    </span>
  `,
})
export class DisplayAmountValueComponent {
  readonly formatService = inject(FormatService);
  @Input({ required: true }) compoundInterestCalcResult!: number;
}
