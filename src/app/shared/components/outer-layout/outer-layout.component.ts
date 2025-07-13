import { Component } from '@angular/core';

@Component({
  selector: 'app-outer-layout',
  imports: [],
  template: `
    <div class="p-3 mt-16">
      <ng-content />
    </div>
  `,
})
export class OuterLayoutComponent {}
