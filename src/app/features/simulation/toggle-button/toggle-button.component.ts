import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  template: `
    @let rotateStyle = isOpen ? 'rotate-180' : 'rotate-90';

    <button
      (click)="clickEvent.emit()"
      class="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition duration-200 ease-in"
    >
      <svg
        viewBox="0 0 100 100"
        class="w-3 h-3 transform transition-transform duration-200 ease-out {{ rotateStyle }}"
      >
        <polygon points="5.9,88.2 50,11.8 94.1,88.2"></polygon>
      </svg>
    </button>
  `,
})
export class ToggleButtonComponent {
  @Input({ required: true }) isOpen!: boolean;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
}
