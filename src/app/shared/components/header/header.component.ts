import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matBarChart, matNotes } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-header',
  imports: [NgIcon],
  viewProviders: provideIcons({ matBarChart, matNotes }),
  template: `
    <header class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <nav class="px-3 sm:px-5 py-3 sm:py-5">
        <div class="flex items-center justify-between">
          <div class="flex gap-2 sm:gap-3 items-center">
            <ng-icon name="matBarChart" size="24" />
            <h1 class="text-base sm:text-xl font-semibold whitespace-nowrap dark:text-white">
              積立かんたんシュミレーター
            </h1>
          </div>
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">open sidebar</span>
            <ng-icon name="matNotes" size="24" />
          </button>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
