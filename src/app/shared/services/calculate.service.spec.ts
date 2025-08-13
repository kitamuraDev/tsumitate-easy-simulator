import { provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import type { Input } from '../types/tsumitate';
import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(CalculateService);
  });

  const mockSimpleInterestCalcInput = [
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000],
      monthlyYears: [12],
      expected: 600000,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000],
      monthlyYears: [12, 24],
      expected: 2040000,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000, 70000],
      monthlyYears: [12, 24, 36],
      expected: 4560000,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000, 70000, 80000],
      monthlyYears: [12, 24, 36, 48],
      expected: 8400000,
    },
  ];

  // biome-ignore format: 一行にまとめたいため
  it.each(mockSimpleInterestCalcInput)('simpleInterestCalc', ({ initialAssetManYen, monthlyAmounts, monthlyYears, expected }) => {
    const result = service['simpleInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears);
    expect(Math.trunc(result)).toBe(expected);
  });

  const monthlyRate = 1.05 ** (1 / 12);
  const mockCompoundInterestCalcInput = [
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000],
      monthlyYears: [12],
      expected: 613628,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000],
      monthlyYears: [12, 24],
      expected: 2186052,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000, 70000],
      monthlyYears: [12, 24, 36],
      expected: 5238880,
    },
    {
      initialAssetManYen: 0,
      monthlyAmounts: [50000, 60000, 70000, 80000],
      monthlyYears: [12, 24, 36, 48],
      expected: 10599599,
    },
  ];

  // biome-ignore format: 一行にまとめたいため
  it.each(mockCompoundInterestCalcInput)('compoundInterestCalc', ({ initialAssetManYen, monthlyAmounts, monthlyYears, expected }) => {
    const result = service['compoundInterestCalc'](initialAssetManYen, monthlyAmounts, monthlyYears, monthlyRate);
    expect(Math.trunc(result)).toBe(expected);
  });

  // biome-ignore format: 一行にまとめたいため
  type MockTsumitateEasyCalculateInput = Input & { expected: { compoundInterest: number; diff: number; simpleInterest: number; } };
  const mockTsumitateEasyCalculateInput: MockTsumitateEasyCalculateInput[] = [
    {
      initialAsset: 0,
      amounts: [5],
      years: [1],
      rate: 5,
      expected: {
        compoundInterest: 613628,
        diff: 13628,
        simpleInterest: 600000,
      },
    },
    {
      initialAsset: 0,
      amounts: [5, 6],
      years: [1, 2],
      rate: 5,
      expected: {
        compoundInterest: 2186052,
        diff: 146052,
        simpleInterest: 2040000,
      },
    },
    {
      initialAsset: 0,
      amounts: [5, 6, 7],
      years: [1, 2, 3],
      rate: 5,
      expected: {
        compoundInterest: 5238880,
        diff: 678880,
        simpleInterest: 4560000,
      },
    },
    {
      initialAsset: 0,
      amounts: [5, 6, 7, 8],
      years: [1, 2, 3, 4],
      rate: 5,
      expected: {
        compoundInterest: 10599599,
        diff: 2199599,
        simpleInterest: 8400000,
      },
    },
  ];

  // biome-ignore format: 一行にまとめたいため
  it.each(mockTsumitateEasyCalculateInput)('tsumitateEasyCalculate', ({ initialAsset, amounts, years, rate, expected }) => {
    const result = service.tsumitateEasyCalculate({ initialAsset, amounts, years, rate });

    expect(Math.trunc(result.compoundInterestCalcResult)).toBe(expected.compoundInterest);
    expect(result.simpleInterestCalcResult).toBe(expected.simpleInterest);
    expect(Math.trunc(result.diff)).toBe(expected.diff);
  });
});
