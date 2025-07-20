import { Component } from '@angular/core';

@Component({
  selector: 'app-outer-layout',
  template: `
    <div class="max-w-screen-lg mx-auto p-3 mt-5 mb-16">
      <ng-content />
    </div>
  `,
})
export class OuterLayoutComponent {}
