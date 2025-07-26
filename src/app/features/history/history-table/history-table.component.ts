import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDelete } from '@ng-icons/material-icons/baseline';
import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../../shared/types/tsumitate';

@Component({
  selector: 'app-history-table',
  imports: [NgIcon, TruncateToTenThousandsPipe, ToPercentagePipe],
  viewProviders: provideIcons({ matDelete }),
  templateUrl: 'history-table.component.html',
})
export class HistoryTableComponent {
  tsumitateList$ = input.required<Tsumitate[]>();
  deleteTsumitate = output<number>();

  readonly tableHeaderNames = [
    '初期資産額',
    '想定利回り',
    '毎月積立額（積立期間）',
    '運用金額',
    '評価損益（率）',
    '最終評価額',
    '削除',
  ];
}
