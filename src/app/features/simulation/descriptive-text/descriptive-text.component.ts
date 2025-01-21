import { Component } from '@angular/core';

@Component({
  selector: 'app-descriptive-text',
  imports: [],
  template: `
    <p class="text-sm sm:text-base font-medium text-gray-900 ml-2">
      <ng-content />
    </p>
  `,
})
export class DescriptiveTextComponent {}
