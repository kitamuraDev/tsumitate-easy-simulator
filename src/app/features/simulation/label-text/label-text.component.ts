import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-label-text',
    imports: [],
    template: `
    <label for="{{ id }}" class="block w-28 sm:w-48 text-sm font-medium text-gray-900">
      <ng-content />
      @if (isRequired) {
        <span class="text-red-700 text-base font-medium">*</span>
      }
    </label>
  `
})
export class LabelTextComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) isRequired!: boolean;
}
