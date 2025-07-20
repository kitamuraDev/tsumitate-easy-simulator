import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-box',
  imports: [FormsModule],
  template: `
    <select
      [id]="id()"
      [disabled]="disabled()"
      [(ngModel)]="selectedValue"
      (ngModelChange)="markAsTouched.emit()"
      class="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
    >
      @for (item of selectList(); track $index) {
        <option [value]="item">{{ item }} {{ optionalTrailing() }}</option>
      }
    </select>
  `,
})
export class SelectBoxComponent {
  id = input.required<string>();
  disabled = input.required<boolean>();
  selectedValue = model.required<string>();
  selectList = input.required<string[]>();
  optionalTrailing = input.required<string>();
  markAsTouched = output<void>();
}
