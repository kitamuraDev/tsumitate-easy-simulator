import { Injectable } from '@angular/core';
import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
      // 入力値が存在しない場合は「小数値判定バリデーション」を発火させたくないため、nullを返す
      if (!control.value) return null;

      return !Number.isInteger(control.value) ? { isNotInteger: true } : null;
    };
  }

  /**
   * 一方のフォームが空であるかどうかを判定するバリデーション
   *
   * - amountはtruthyで、yearもtruthyである場合：trueが返る（trueが返るため、`!(amount || year)`は評価されない）
   * - amountはtruthyだが、yearはfalsyである場合：falseが返る
   * - amountとyearの両方がfalsyである場合：trueが返る（`!(false || false)`になり、`!`で反転されてtrueになる）
   */
  isOneInputEmptyValidator(amount: number | null | undefined, year: number | null | undefined): boolean {
    return !!(amount && year) || !(amount || year);
  }
}
