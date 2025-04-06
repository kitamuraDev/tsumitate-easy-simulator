import { Injectable } from '@angular/core';
import Dexie from 'dexie';

// biome-ignore format: コメントを揃えたいため
type NoInvestmentPeriodIncluded = {
  id?: number;                           // 一意のID
  isNoInvestmentPeriodIncluded: boolean; // 積立無しの期間を含めるかどうかのフラグ
  selectedCurrentAge: string;            // 現在の年齢
  selectedEndAge: string;                // 運用終了年齢
};

@Injectable({
  providedIn: 'root',
})
export class SettingDatabaseService extends Dexie {
  readonly noInvestmentPeriodIncluded: Dexie.Table<NoInvestmentPeriodIncluded, number>;

  constructor() {
    super('noInvestmentPeriodIncluded');

    this.version(1).stores({
      noInvestmentPeriodIncluded: '++id, isNoInvestmentPeriodIncluded, selectedCurrentAge, selectedEndAge',
    });

    this.noInvestmentPeriodIncluded = this.table('noInvestmentPeriodIncluded');

    // 初期値のデータ登録（既にデータが存在する場合は実行されない）
    this.on('populate', async () => {
      await this.noInvestmentPeriodIncluded.add({
        isNoInvestmentPeriodIncluded: false,
        selectedCurrentAge: '25',
        selectedEndAge: '65',
      });
    });
  }

  // 取得
  async getNoInvestmentPeriodIncluded(): Promise<NoInvestmentPeriodIncluded> {
    const result = await this.noInvestmentPeriodIncluded.get(1);

    return result
      ? result
      : {
          isNoInvestmentPeriodIncluded: false,
          selectedCurrentAge: '25',
          selectedEndAge: '65',
        };
  }

  // 更新
  async updateNoInvestmentPeriodIncluded(noInvestmentPeriodIncluded: NoInvestmentPeriodIncluded): Promise<void> {
    await this.noInvestmentPeriodIncluded.update(1, noInvestmentPeriodIncluded);
  }
}
