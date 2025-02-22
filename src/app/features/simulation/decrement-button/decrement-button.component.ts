import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matMinus } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-decrement-button',
  imports: [NgIcon],
  viewProviders: provideIcons({ matMinus }),
  template: `
    <button
      type="button"
      id="decrement-button"
      (click)="decrement.emit()"
      class="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <ng-icon name="matMinus" size="20" />
    </button>
  `,
})
export class DecrementButtonComponent {
  @Output() decrement: EventEmitter<void> = new EventEmitter<void>();
}
