import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [disabled]="isDisabled"
      (click)="clickEvent.emit()"
      class="
        text-base font-medium text-center rounded-lg w-32 sm:w-36 h-11 sm:h-12 p-2 transition-opacity text-white
        {{ isDisabled ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:opacity-70' }}
      "
    >
      <ng-content />
    </button>
  `,
})
export class BaseButtonComponent {
  @Input({ required: true }) isDisabled!: boolean;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
}
