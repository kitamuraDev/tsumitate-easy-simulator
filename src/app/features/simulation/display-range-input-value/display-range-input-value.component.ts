import { Component } from '@angular/core';

@Component({
  selector: 'app-display-range-input-value',
  template: `
    <span class="text-base text-center font-semibold text-gray-900 bg-gray-200 block w-20 h-10 py-2 px-4 rounded">
      <ng-content />
    </span>
  `,
})
export class DisplayRangeInputValueComponent {}
