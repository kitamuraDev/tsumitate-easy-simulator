import { Component, type OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type AmountChangeSetting, SettingDatabaseService } from '../../core/setting-database.service';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { SwitchButtonComponent } from './components/switch-button/switch-button.component';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, HeadContentComponent, SwitchButtonComponent, SelectBoxComponent],
  templateUrl: './setting.component.html',
})
export default class SettingComponent implements OnInit {
  private readonly settingDatabaseService = inject(SettingDatabaseService);

  // ユーザーが一度でも編集したかどうかのフラグ
  isFormEdited = signal(false);

  // 積立無しの期間を含めるかどうかのフラグ
  isNoInvestmentPeriodIncluded = signal(false);
  // 現在の年齢。20歳 ~ 50歳
  readonly currentAgeList = Array.from({ length: 31 }, (_, i) => `${i + 20}`);
  selectedCurrentAge = signal(this.currentAgeList[0]);
  // 運用終了年齢。50歳 ~ 70歳
  readonly endAgeList = Array.from({ length: 21 }, (_, i) => `${i + 50}`);
  selectedEndAge = signal(this.endAgeList[0]);

  // 積立額変更を行うか否かのフラグ
  isAmountChangeEnabled = signal(false);
  // 積立額の変更回数。1回 ~ 3回
  readonly amountChangeCountList = ['1', '2', '3'];
  selectedAmountChangeCount = signal<AmountChangeSetting['selectedAmountChangeCount']>(
    this.amountChangeCountList[0] as AmountChangeSetting['selectedAmountChangeCount'],
  );

  async ngOnInit() {
    await Promise.all([this.getNoInvestmentPeriodIncludedSetting(), this.getAmountChangeSetting()]);
  }

  // ユーザーが一度でも編集した場合、フラグをを立てる
  markAsTouched() {
    this.isFormEdited.set(true);
  }

  async getNoInvestmentPeriodIncludedSetting() {
    const result = await this.settingDatabaseService.getNoInvestmentPeriodIncludedSetting();

    this.isNoInvestmentPeriodIncluded.set(result.isNoInvestmentPeriodIncluded);
    this.selectedCurrentAge.set(result.selectedCurrentAge);
    this.selectedEndAge.set(result.selectedEndAge);
  }

  async updateNoInvestmentPeriodIncludedSetting() {
    await this.settingDatabaseService.updateNoInvestmentPeriodIncludedSetting({
      isNoInvestmentPeriodIncluded: this.isNoInvestmentPeriodIncluded(),
      selectedCurrentAge: this.selectedCurrentAge(),
      selectedEndAge: this.selectedEndAge(),
    });
  }

  async getAmountChangeSetting() {
    const result = await this.settingDatabaseService.getAmountChangeSetting();

    this.isAmountChangeEnabled.set(result.isAmountChangeEnabled);
    this.selectedAmountChangeCount.set(result.selectedAmountChangeCount);
  }

  async updateAmountChangeSetting() {
    await this.settingDatabaseService.updateAmountChangeSetting({
      isAmountChangeEnabled: this.isAmountChangeEnabled(),
      selectedAmountChangeCount: this.selectedAmountChangeCount(),
    });
  }

  // 設定値を保存
  async saveSetting() {
    await Promise.all([this.updateNoInvestmentPeriodIncludedSetting(), this.updateAmountChangeSetting()]);

    // フラグを元に戻す
    this.isFormEdited.set(false);
  }
}
