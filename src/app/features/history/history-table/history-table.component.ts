import { Component, EventEmitter, Output, input } from '@angular/core';
import { DeleteButtonComponent } from '../../../shared/components/delete-button/delete-button.component';
import { ToPercentagePipe } from '../../../shared/pipes/to-percentage.pipe';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import type { Tsumitate } from '../../../shared/types/tsumitate';

@Component({
  selector: 'app-history-table',
  imports: [DeleteButtonComponent, TruncateToTenThousandsPipe, ToPercentagePipe],
  templateUrl: 'history-table.component.html',
})
export class HistoryTableComponent {
  tsumitateList$ = input.required<Tsumitate[]>();
  @Output() deleteTsumitate: EventEmitter<number> = new EventEmitter<number>();

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
