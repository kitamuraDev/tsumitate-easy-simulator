import { Injectable } from '@angular/core';
import Dexie from 'dexie';

// biome-ignore format: コメントを揃えたいため
type NoInvestmentPeriodIncludedSetting = {
  id?: number;                                // 一意のID
  isNoInvestmentPeriodIncluded: boolean;      // 積立無しの期間を含めるかどうかのフラグ
  selectedCurrentAge: string;                 // 現在の年齢
  selectedEndAge: string;                     // 運用終了年齢
};

// biome-ignore format: コメントを揃えたいため
export type AmountChangeSetting = {
  id?: number;                                // 一意のID
  isAmountChangeEnabled: boolean;             // 積立額変更を行うか否かのフラグ
  selectedAmountChangeCount: '1' | '2' | '3'; // 積立額の変更回数
};

@Injectable({
  providedIn: 'root',
})
export class SettingDatabaseService extends Dexie {
  readonly noInvestmentPeriodIncludedSetting: Dexie.Table<NoInvestmentPeriodIncludedSetting, number>;
  readonly amountChangeSetting: Dexie.Table<AmountChangeSetting, number>;

  constructor() {
    super('settings');

    this.version(1).stores({
      noInvestmentPeriodIncludedSetting: '++id, isNoInvestmentPeriodIncluded, selectedCurrentAge, selectedEndAge',
      amountChangeSetting: '++id, isAmountChangeEnabled, selectedAmountChangeCount',
    });

    this.noInvestmentPeriodIncludedSetting = this.table('noInvestmentPeriodIncludedSetting');
    this.amountChangeSetting = this.table('amountChangeSetting');

    // 初期値のデータ登録（既にデータが存在する場合は実行されない）
    this.on('populate', async () => {
      await Promise.all([
        this.noInvestmentPeriodIncludedSetting.add({
          isNoInvestmentPeriodIncluded: false,
          selectedCurrentAge: '25',
          selectedEndAge: '65',
        }),
        this.amountChangeSetting.add({
          isAmountChangeEnabled: false,
          selectedAmountChangeCount: '1',
        }),
      ]);
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
   * @param model 更新するNoInvestmentPeriodIncludedSettingオブジェクト
   * @returns Promise<void>
   */
  async updateNoInvestmentPeriodIncludedSetting(model: NoInvestmentPeriodIncludedSetting): Promise<void> {
    await this.noInvestmentPeriodIncludedSetting.update(1, model);
  }

  /**
   * 積立額変更設定テーブルからデータを取得
   *
   * @returns AmountChangeSetting オブジェクト。データが存在しない場合は初期値を返す
   * - isAmountChangeEnabled: 積立額変更を行うか否か
   * - selectedAmountChangeCount: 積立額の変更回数
   */
  async getAmountChangeSetting(): Promise<AmountChangeSetting> {
    const result = await this.amountChangeSetting.get(1);
    return result
      ? result
      : {
          isAmountChangeEnabled: false,
          selectedAmountChangeCount: '1',
        };
  }

  /**
   * 積立額変更設定テーブルのデータを更新
   *
   * @param model 更新するAmountChangeSettingオブジェクト
   * @returns Promise<void>
   */
  async updateAmountChangeSetting(model: AmountChangeSetting): Promise<void> {
    await this.amountChangeSetting.update(1, model);
  }
}
