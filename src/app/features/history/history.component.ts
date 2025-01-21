import { Component, type OnInit, inject, signal } from '@angular/core';
import { TsumitateDatabaseService } from '../../core/tsumitate-database.service';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import type { Tsumitate } from '../../shared/types/tsumitate';
import { HistoryTableComponent } from './history-table/history-table.component';
import { NoHistoryMessageComponent } from './no-history-message/no-history-message.component';

@Component({
  selector: 'app-history',
  imports: [HeadContentComponent, HistoryTableComponent, NoHistoryMessageComponent],
  template: `
    <app-head-content [title]="'シュミレーション履歴'" [hasDescription]="false" />

    @if (tsumitateList().length > 0) {
      @defer {
        <app-history-table [tsumitateList]="tsumitateList" (deleteTsumitate)="deleteTsumitate($event)" />
      }
    } @else {
      <app-no-history-message />
    }
  `,
})
export default class HistoryComponent implements OnInit {
  private readonly dbService = inject(TsumitateDatabaseService);
  readonly tsumitateList = signal<Tsumitate[]>([]);

  ngOnInit(): void {
    this.dbService.getAllTsumitate().then((values) => this.tsumitateList.set(values));
  }

  async deleteTsumitate(id: number) {
    await this.dbService.deleteTsumitate(id);

    this.tsumitateList.update((list) => list.filter((v) => v.id !== id));
  }
}
