import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-history-message',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div role="alert" class="flex gap-3 p-4 text-sm border rounded-lg text-blue-800 border-blue-300 bg-blue-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
      <span class="sr-only">Info</span>
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
