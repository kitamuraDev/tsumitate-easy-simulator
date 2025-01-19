import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  imports: [],
  template: `
    <button
      [disabled]="isDisabled"
      (click)="clickEvent.emit()"
      class="
        text-base font-medium text-center rounded-lg
        {{ widthDefault }} {{ widthSm }} px-2 py-3 transition-opacity text-white
        {{ isDisabled ? 'bg-blue-500 bg-opacity-40 cursor-not-allowed' : 'bg-blue-500 hover:opacity-70' }}
      "
    >
      <ng-content />
    </button>
  `,
})
export class BaseButtonComponent {
  @Input({ required: true }) isDisabled!: boolean;
  @Input({ required: true }) widthDefault!: string;
  @Input({ required: true }) widthSm!: string;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
}
