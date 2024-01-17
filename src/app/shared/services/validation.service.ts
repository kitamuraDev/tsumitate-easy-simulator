import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   * 小数値判定バリデーション
   *
   * @returns ValidatorFn
   */
  integerValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !Number.isInteger(control.value) ? { isNotInteger: true } : null;
    };
  }
}
