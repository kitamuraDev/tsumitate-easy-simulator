import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-decrement-button',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      id="decrement-button"
      (click)="decrement.emit()"
      class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <svg
        class="w-3 h-3 text-gray-900"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 2"
      >
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
      </svg>
    </button>
  `,
})
export class DecrementButtonComponent {
  @Output() decrement: EventEmitter<void> = new EventEmitter<void>();
}
