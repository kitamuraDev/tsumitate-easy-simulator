import { Component, input } from '@angular/core';

@Component({
  selector: 'app-head-content',
  template: `
    <section class="p-3 mb-5">
      <h1 class="text-xl sm:text-2xl font-semibold whitespace-nowrap">{{ title() }}</h1>
      @if (hasDescription()) {
        <div class="text-sm font-medium mt-5 space-y-2">
          <ng-content />
        </div>
      }
    </section>
  `,
})
export class HeadContentComponent {
  title = input.required<string>();
  hasDescription = input.required<boolean>();
}
