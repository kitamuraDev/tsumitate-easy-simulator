import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  template: `
    @let bgStyles = disabled() ? 'bg-blue-500 bg-opacity-40 cursor-not-allowed' : 'bg-blue-500 hover:opacity-70';

    <button
      [disabled]="disabled()"
      (click)="clickEvent.emit()"
      [attr.popovertarget]="popovertarget()"
      class="
        {{bgStyles}} transition-opacity
        text-base font-medium text-center text-white
        fixed left-1/2 -translate-x-1/2 bottom-16 mb-3 w-24 px-2 py-3 rounded-lg"
    >
      <ng-content />
    </button>
  `,
})
export class BaseButtonComponent {
  disabled = input.required<boolean>();
  popovertarget = input<string>();
  clickEvent = output();
}
