import { Component, EventEmitter, Input, Output, WritableSignal, inject } from '@angular/core';
import { FormatService } from '../../../shared/services/format.service';
import { Tsumitate } from '../../../shared/types/tsumitate';
import { DeleteButtonComponent } from '../../../shared/components/delete-button/delete-button.component';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [DeleteButtonComponent],
  templateUrl: 'history-table.component.html',
})
export class HistoryTableComponent {
  @Input({ required: true }) tsumitateList!: WritableSignal<Tsumitate[]>;
  @Output() deleteTsumitate: EventEmitter<number> = new EventEmitter<number>();
  readonly fmtService = inject(FormatService);

  readonly tableHeaderNames = [
    '初期資産額',
    '想定利回り',
    '毎月積立額（積立期間）',
    '運用金額',
    '評価損益',
    '最終評価額',
    '削除',
  ];
}
