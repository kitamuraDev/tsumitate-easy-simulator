import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';
import { BaseButtonComponent } from '../../shared/components/base-button/base-button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, HeadContentComponent, BaseButtonComponent],
  template: `
    <app-head-content [title]="'ページが見つかりません'" [hasDescription]="true">
      <p>お探しのページは見つかりませんでした。</p>
      <p>
        申し訳ありませんが、指定されたURLが正しくない可能性があります。もしくは、ページが移動または削除された可能性があります。
      </p>
      <p>お手数ですが、再度URLをご確認の上、再度アクセスしてください。</p>
    </app-head-content>
    <div class="px-3 sm:px-6">
      <app-base-button
        [isDisabled]="false"
        [widthDefault]="'w-48'"
        [widthSm]="'sm:w-52'"
        (clickEvent)="toOverViewPage()"
      >
        ホームヘ戻る
      </app-base-button>
    </div>
  `,
})
export default class NotFoundComponent {
  private readonly router = inject(Router);

  toOverViewPage() {
    this.router.navigate(['/overview']);
  }
}
