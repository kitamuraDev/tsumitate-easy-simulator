import { Component } from '@angular/core';

@Component({
  selector: 'app-display-range-input-value',
  template: `
    <span class="text-base font-semibold text-gray-900 py-2 px-4 rounded bg-gray-200 block w-20 h-10 text-center">
      <ng-content />
    </span>
  `,
})
export class DisplayRangeInputValueComponent {}
