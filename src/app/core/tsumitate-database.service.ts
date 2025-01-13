import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Tsumitate } from '../shared/types/tsumitate';

@Injectable({
  providedIn: 'root',
})
export class TsumitateDatabaseService extends Dexie {
  readonly tsumitate: Dexie.Table<Tsumitate, number>;
  constructor() {
    super('tsumitate');

    this.version(2).stores({
      tsumitate:
        '++id, initialAsset, *amounts, *years, rate, compoundInterestCalcResult, simpleInterestCalcResult, diff',
    });

    this.tsumitate = this.table('tsumitate');
  }

  // 追加
  async add(tsumitate: Tsumitate) {
    await this.tsumitate.add(tsumitate);
  }

  // 全件取得
  async getAllTsumitate(): Promise<Tsumitate[]> {
    return await this.tsumitate.toArray();
  }

  // 削除
  async deleteTsumitate(id: number): Promise<void> {
    await this.tsumitate.delete(id);
  }
}
