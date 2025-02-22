import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeadContentComponent } from '../../shared/components/head-content/head-content.component';

@Component({
  selector: 'app-not-found',
  imports: [HeadContentComponent],
  template: `
    <app-head-content [title]="'ページが見つかりません'" [hasDescription]="true">
      <p>お探しのページは見つかりませんでした。</p>
      <p>
        申し訳ありませんが、指定されたURLが正しくない可能性があります。もしくは、ページが移動または削除された可能性があります。
      </p>
      <p>お手数ですが、再度URLをご確認の上、再度アクセスしてください。</p>
    </app-head-content>
    <div class="px-3 sm:px-6">
      <button
        (click)="toOverViewPage()"
        class="text-base font-medium text-center rounded-lg w-48 sm:w-52 px-2 py-3 transition-opacity text-white bg-blue-500 hover:opacity-70"
      >
        ホームヘ戻る
      </button>
    </div>
  `,
})
export default class NotFoundComponent {
  private readonly router = inject(Router);

  toOverViewPage() {
    this.router.navigate(['/overview']);
  }
}
