import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matInfo } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-no-history-message',
  imports: [RouterLink, NgIcon],
  viewProviders: provideIcons({ matInfo }),
  template: `
    <div role="alert" class="flex gap-3 p-4 text-sm border rounded-lg text-blue-800 border-blue-300 bg-blue-50">
      <ng-icon name="matInfo" size="24" class="flex-shrink-0" />
      <div>
        <p class="text-base font-semibold mb-2">履歴データがありません</p>
        <p>
          <a routerLink="/simulation" class="cursor-pointer underline">こちら</a>
          から積立投資のかんたんシュミレーションが行えます。
        </p>
      </div>
    </div>
  `,
})
export class NoHistoryMessageComponent {}
