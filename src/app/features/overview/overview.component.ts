import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseButtonComponent } from '../../shared/components/base-button/base-button.component';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';

@Component({
  selector: 'app-overview',
  imports: [HeadContentComponent, BaseButtonComponent],
  template: `
    <app-head-content [title]="'はじめに'" [hasDescription]="true">
      <p>
        当資産運用シュミレーターでは、想定利回り○%で毎月○万円を○年間、積立投資をした場合の資産評価額を計算できます。
      </p>
      <p>
        また、グレー背景にある"毎月積立額"と"積立期間"の入力により、「積立投資を行う中で
        <span class="underline font-semibold px-1">後から積立額を変更するパターン</span>
        も考慮したシュミレーションを行いたい」ケースにも対応しています。
      </p>
    </app-head-content>
    <div class="grid place-content-center mt-10">
      <app-base-button
        [isDisabled]="false"
        [widthDefault]="'w-52'"
        [widthSm]="'sm:w-56'"
        (clickEvent)="toSimulationPage()"
      >
        シュミレーションをする
      </app-base-button>
    </div>
  `,
})
export default class OverviewComponent {
  private readonly router = inject(Router);

  toSimulationPage() {
    this.router.navigate(['/simulation']);
  }
}
