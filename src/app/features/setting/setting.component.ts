import { Component, type OnInit, inject } from '@angular/core';
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
  isFormEdited = false;
  // 積立無しの期間を含めるかどうかのフラグ
  isNoInvestmentPeriodIncluded = false;
  // 現在の年齢。20歳 ~ 50歳
  readonly currentAgeList = Array.from({ length: 31 }, (_, i) => `${i + 20}`);
  selectedCurrentAge: string = this.currentAgeList[0];
  // 運用終了年齢。50歳 ~ 70歳
  readonly endAgeList = Array.from({ length: 21 }, (_, i) => `${i + 50}`);
  selectedEndAge: string = this.endAgeList[0];

  ngOnInit() {
    this.getNoInvestmentPeriodIncluded();
  }

  // ユーザーが一度でも編集した場合、フラグをを立てる
  markAsTouched() {
    this.isFormEdited = true;
  }

  // 設定値を取得
  async getNoInvestmentPeriodIncluded() {
    const result = await this.settingDatabaseService.getNoInvestmentPeriodIncluded();

    this.isNoInvestmentPeriodIncluded = result.isNoInvestmentPeriodIncluded;
    this.selectedCurrentAge = result.selectedCurrentAge;
    this.selectedEndAge = result.selectedEndAge;
  }

  // 設定値を保存
  async saveSetting() {
    await this.settingDatabaseService.updateNoInvestmentPeriodIncluded({
      isNoInvestmentPeriodIncluded: this.isNoInvestmentPeriodIncluded,
      selectedCurrentAge: this.selectedCurrentAge,
      selectedEndAge: this.selectedEndAge,
    });

    // フラグを元に戻す
    this.isFormEdited = false;
  }
}
