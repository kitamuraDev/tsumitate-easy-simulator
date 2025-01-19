import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-increment-button',
  imports: [],
  template: `
    <button
      type="button"
      id="increment-button"
      (click)="increment.emit()"
      data-input-counter-increment="bedrooms-input"
      class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <svg
        class="w-3 h-3 text-gray-900"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    </button>
  `,
})
export class IncrementButtonComponent {
  @Output() increment: EventEmitter<void> = new EventEmitter<void>();
}
