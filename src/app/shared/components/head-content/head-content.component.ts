import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-head-content',
  imports: [],
  template: `
    <section class="max-w-screen-md p-3 sm:p-6 mb-5">
      <h1 class="text-xl sm:text-2xl font-semibold whitespace-nowrap">{{ title }}</h1>
      @if (hasDescription) {
        <div class="text-sm font-medium mt-5 space-y-2">
          <ng-content />
        </div>
      }
    </section>
  `,
})
export class HeadContentComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) hasDescription!: boolean;
}
