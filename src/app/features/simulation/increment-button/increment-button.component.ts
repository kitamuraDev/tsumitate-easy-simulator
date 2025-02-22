import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matPlus } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-increment-button',
  imports: [NgIcon],
  viewProviders: provideIcons({ matPlus }),
  template: `
    <button
      type="button"
      id="increment-button"
      (click)="increment.emit()"
      class="flex items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
    >
      <ng-icon name="matPlus" size="20" />
    </button>
  `,
})
export class IncrementButtonComponent {
  @Output() increment: EventEmitter<void> = new EventEmitter<void>();
}
