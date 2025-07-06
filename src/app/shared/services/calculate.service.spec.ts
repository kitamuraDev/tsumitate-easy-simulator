import { provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import type { Input } from '../types/tsumitate';
import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;
  const monthlyRate = 1.05 ** (1 / 12);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(CalculateService);
  });

  it('【複利計算】年利:5%, 初期資産:0万, 積立額:3万, 積立年数:3年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [30000];
    const monthlyYears = [36];
    const expectedCompoundInterest = 1160679;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:0万, 積立額:3万, 積立年数:3年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [30000];
    const monthlyYears = [36];
    const expectedSimpleInterest = 1080000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('【複利計算】年利:5%, 初期資産:115万, 積立額:3万, 積立年数:3年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [30000];
    const monthlyYears = [36];
    const expectedCompoundInterest = 2491947;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:115万, 積立額:3万, 積立年数:3年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [30000];
    const monthlyYears = [36];
    const expectedSimpleInterest = 2230000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('【複利計算】年利:5%, 初期資産:0万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [30000, 40000, 50000];
    const monthlyYears = [36, 60, 96];
    const expectedCompoundInterest = 12055913;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:0万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [30000, 40000, 50000];
    const monthlyYears = [36, 60, 96];
    const expectedSimpleInterest = 8280000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('【複利計算】年利:5%, 初期資産:115万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [30000, 40000, 50000];
    const monthlyYears = [36, 60, 96];
    const expectedCompoundInterest = 14566219;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:115万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [30000, 40000, 50000];
    const monthlyYears = [36, 60, 96];
    const expectedSimpleInterest = 9430000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('【複利計算】年利:5%, 初期資産:0万, 積立額:2万 3万 4万 5万, 積立年数:1年 2年 3年 3年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [20000, 30000, 40000, 50000];
    const monthlyYears = [12, 24, 36, 36];
    const expectedCompoundInterest = 5100072;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:0万, 積立額:2万 3万 4万 5万, 積立年数:1年 2年 3年 3年', () => {
    const initialAssetManYen = 0;
    const monthlyAmounts = [20000, 30000, 40000, 50000];
    const monthlyYears = [12, 24, 36, 36];
    const expectedSimpleInterest = 4200000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('【複利計算】年利:5%, 初期資産:115万, 積立額:2万 3万 4万 5万, 積立年数:1年 2年 3年 3年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [20000, 30000, 40000, 50000];
    const monthlyYears = [12, 24, 36, 36];
    const expectedCompoundInterest = 6884099;

    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);

    expect(Math.trunc(result)).toBe(expectedCompoundInterest);
  });

  it('【合算】初期資産:115万, 積立額:2万 3万 4万 5万, 積立年数:1年 2年 3年 3年', () => {
    const initialAssetManYen = 1150000;
    const monthlyAmounts = [20000, 30000, 40000, 50000];
    const monthlyYears = [12, 24, 36, 36];
    const expectedSimpleInterest = 5350000;

    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);

    expect(result).toBe(expectedSimpleInterest);
  });

  it('年利:5%, 初期資産:0万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const input: Input = {
      initialAsset: 0,
      amounts: [3, 4, 5],
      years: [3, 5, 8],
      rate: 5,
    };

    const expectedCompoundInterest = 12055913;
    const expectedSimpleInterest = 8280000;
    const expectedDiff = expectedCompoundInterest - expectedSimpleInterest;

    const result = service.tsumitateEasyCalculate(input);

    expect(Math.trunc(result.compoundInterestCalcResult)).toBe(expectedCompoundInterest);
    expect(result.simpleInterestCalcResult).toBe(expectedSimpleInterest);
    expect(Math.trunc(result.diff)).toBe(expectedDiff);
  });

  it('年利:5%, 初期資産:115万, 積立額:3万 4万 5万, 積立年数:3年 5年 8年', () => {
    const input: Input = {
      initialAsset: 115,
      amounts: [3, 4, 5],
      years: [3, 5, 8],
      rate: 5,
    };

    const expectedCompoundInterest = 14566219;
    const expectedSimpleInterest = 9430000;
    const expectedDiff = expectedCompoundInterest - expectedSimpleInterest;

    const result = service.tsumitateEasyCalculate(input);

    expect(Math.trunc(result.compoundInterestCalcResult)).toBe(expectedCompoundInterest);
    expect(result.simpleInterestCalcResult).toBe(expectedSimpleInterest);
    expect(Math.trunc(result.diff)).toBe(expectedDiff);
  });
});
