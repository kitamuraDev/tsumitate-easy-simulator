import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matClose } from '@ng-icons/material-icons/baseline';

import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../../shared/types/tsumitate';

@Component({
  selector: 'app-display-simulation-result',
  imports: [TruncateToTenThousandsPipe, ToPercentagePipe, NgIcon],
  viewProviders: provideIcons({ matClose }),
  templateUrl: './display-simulation-result.component.html',
})
export class DisplaySimulationResultComponent {
  tsumitateSimulationResult = input.required<Tsumitate>();
}
