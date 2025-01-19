import { Component } from '@angular/core';

@Component({
    selector: 'app-validation-warning-message',
    imports: [],
    template: `
    <!-- prettier-ignore -->
    <p class="text-red-700 text-xs font-medium text-right mt-1">
      <ng-content />
    </p>
  `
})
export class ValidationWarningMessageComponent {}
