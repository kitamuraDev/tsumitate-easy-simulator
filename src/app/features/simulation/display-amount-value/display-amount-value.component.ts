import { Component, Input, inject } from '@angular/core';
import { Tsumitate } from '../../../shared/types/tsumitate';
import { FormatService } from '../../../shared/services/format.service';

@Component({
  selector: 'app-display-amount-value',
  standalone: true,
  imports: [],
  template: `
    <span class="text-2xl font-semibold">
      {{ formatService.formatAmountToTenThousand(tsumitate.output.compoundInterestCalcResult) }}
    </span>
  `,
})
export class DisplayAmountValueComponent {
  readonly formatService = inject(FormatService);
  @Input({ required: true }) tsumitate!: Tsumitate;
}
