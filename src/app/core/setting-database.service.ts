import { Injectable } from '@angular/core';
import Dexie from 'dexie';

// biome-ignore format: コメントを揃えたいため
type NoInvestmentPeriodIncludedSetting = {
  id?: number;                           // 一意のID
  isNoInvestmentPeriodIncluded: boolean; // 積立無しの期間を含めるかどうかのフラグ
  selectedCurrentAge: string;            // 現在の年齢
  selectedEndAge: string;                // 運用終了年齢
};

@Injectable({
  providedIn: 'root',
})
export class SettingDatabaseService extends Dexie {
  readonly noInvestmentPeriodIncludedSetting: Dexie.Table<NoInvestmentPeriodIncludedSetting, number>;

  constructor() {
    super('settings');

    this.version(1).stores({
      noInvestmentPeriodIncludedSetting: '++id, isNoInvestmentPeriodIncluded, selectedCurrentAge, selectedEndAge',
    });

    this.noInvestmentPeriodIncludedSetting = this.table('noInvestmentPeriodIncludedSetting');

    // 初期値のデータ登録（既にデータが存在する場合は実行されない）
    this.on('populate', async () => {
      await this.noInvestmentPeriodIncludedSetting.add({
        isNoInvestmentPeriodIncluded: false,
        selectedCurrentAge: '25',
        selectedEndAge: '65',
      });
    });
  }

  /**
   * 積立無し期間設定テーブルからデータを取得
   *
   * @returns NoInvestmentPeriodIncludedSetting オブジェクト。データが存在しない場合は初期値を返す
   * - isNoInvestmentPeriodIncluded: 積立無し期間を含めるかどうか
   * - selectedCurrentAge: 現在の年齢
   * - selectedEndAge: 運用終了年齢
   */
  async getNoInvestmentPeriodIncludedSetting(): Promise<NoInvestmentPeriodIncludedSetting> {
    const result = await this.noInvestmentPeriodIncludedSetting.get(1);
    return result
      ? result
      : {
          isNoInvestmentPeriodIncluded: false,
          selectedCurrentAge: '25',
          selectedEndAge: '65',
        };
  }

  /**
   * 積立無し期間設定テーブルのデータを更新
   *
   * @param noInvestmentPeriodIncludedSetting 更新するNoInvestmentPeriodIncludedSettingオブジェクト
   * @returns Promise<void>
   */
  async updateNoInvestmentPeriodIncludedSetting(
    noInvestmentPeriodIncludedSetting: NoInvestmentPeriodIncludedSetting,
  ): Promise<void> {
    await this.noInvestmentPeriodIncludedSetting.update(1, noInvestmentPeriodIncludedSetting);
  }
}
