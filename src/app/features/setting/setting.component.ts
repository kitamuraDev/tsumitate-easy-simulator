import { Component, type OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingDatabaseService } from '../../core/setting-database.service';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, HeadContentComponent],
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

  ngOnInit() {
    this.getNoInvestmentPeriodIncludedSetting();
  }

  // ユーザーが一度でも編集した場合、フラグをを立てる
  markAsTouched() {
    this.isFormEdited.set(true);
  }

  // 設定値を取得
  async getNoInvestmentPeriodIncludedSetting() {
    const result = await this.settingDatabaseService.getNoInvestmentPeriodIncludedSetting();

    this.isNoInvestmentPeriodIncluded.set(result.isNoInvestmentPeriodIncluded);
    this.selectedCurrentAge.set(result.selectedCurrentAge);
    this.selectedEndAge.set(result.selectedEndAge);
  }

  // 設定値を保存
  async saveSetting() {
    await this.settingDatabaseService.updateNoInvestmentPeriodIncludedSetting({
      isNoInvestmentPeriodIncluded: this.isNoInvestmentPeriodIncluded(),
      selectedCurrentAge: this.selectedCurrentAge(),
      selectedEndAge: this.selectedEndAge(),
    });

    // フラグを元に戻す
    this.isFormEdited.set(false);
  }
}
