import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  imports: [],
  template: `
    <div class="mx-auto max-w-screen-lg flex flex-col gap-5 sm:items-center 2xl:items-start">
      <ng-content />
    </div>
  `,
})
export class MainLayoutComponent {}
