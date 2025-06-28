import { TestBed } from '@angular/core/testing';
import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { beforeEach, describe, expect, it } from 'vitest';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('整数を与えられた場合、null を返すか', () => {
    const validator: ValidatorFn = service.integerValueValidator();
    const control: AbstractControl = { value: 42 } as AbstractControl;

    const result: ValidationErrors | null = validator(control);

    expect(result).toBeNull();
  });

  it('小数を与えられた場合、{ isNotInteger: true } を返すか', () => {
    const validator: ValidatorFn = service.integerValueValidator();
    const control: AbstractControl = { value: 3.14 } as AbstractControl;

    const result: ValidationErrors | null = validator(control);

    expect(result).toEqual({ isNotInteger: true });
  });

  it('両方のフォームに入力がある場合、true を返すか', () => {
    const result: boolean = service.isOneInputEmptyValidator(5, 5);

    expect(result).toBeTruthy();
  });

  it('両方のフォームに入力がない場合、true を返すか', () => {
    const result: boolean = service.isOneInputEmptyValidator(null, null);

    expect(result).toBeTruthy();
  });

  it('片方（amount）のフォーム入力が欠けている場合、false を返すか', () => {
    const result: boolean = service.isOneInputEmptyValidator(null, 5);

    expect(result).toBeFalsy();
  });

  it('片方（year）のフォーム入力が欠けている場合、false を返すか', () => {
    const result: boolean = service.isOneInputEmptyValidator(5, null);

    expect(result).toBeFalsy();
  });
});
