import { Component } from '@angular/core';

@Component({
  selector: 'app-outer-layout',
  standalone: true,
  imports: [],
  template: `
    <!-- prettier-ignore -->
    <div class="p-3 sm:ml-64 mt-16 sm:mt-[68px]">
      <ng-content />
    </div>
  `,
})
export class OuterLayoutComponent {}
