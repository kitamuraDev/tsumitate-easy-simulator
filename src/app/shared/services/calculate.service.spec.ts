import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';
import { Input } from '../types/tsumitate';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
  });

  it('【1】正の整数を万単位に変換できるか', () => {
    const actualInitialAsset = 5;
    const expectedManen = 50000;

    const result = service['convertToManen'](actualInitialAsset);

    expect(result).toEqual(expectedManen);
  });

  it('【2】正の整数を万単位に変換できるか', () => {
    const actualInitialAsset = 50;
    const expectedManen = 500000;

    const result = service['convertToManen'](actualInitialAsset);

    expect(result).toEqual(expectedManen);
  });

  it('【3】正の整数を万単位に変換できるか', () => {
    const actualInitialAsset = 115;
    const expectedManen = 1150000;

    const result = service['convertToManen'](actualInitialAsset);

    expect(result).toEqual(expectedManen);
  });

  it('【4】正の整数を万単位に変換できるか', () => {
    const actualInitialAsset = 1800;
    const expectedManen = 18000000;

    const result = service['convertToManen'](actualInitialAsset);

    expect(result).toEqual(expectedManen);
  });

  it('配列の中の「月間積立投資額」を「年間積立投資額」に変換できるか', () => {
    const actualMonthlyAmounts = [3, 4, 5];
    const expectedYearlyAmounts = [360000, 480000, 600000];

    const result = service['convertToYearlyAmounts'](actualMonthlyAmounts);

    expect(result).toEqual(expectedYearlyAmounts);
  });

  it('整数の年率を小数の年率に変換できるか', () => {
    const actualIntRate = 5;
    const expectedDecimalRate = 1.05;

    const result = service['convertRate'](actualIntRate);

    expect(result).toEqual(expectedDecimalRate);
  });

  it('【1】複利計算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [360000];
    const years = [3];
    const rate = 1.05;
    const expectedCompoundInterest = 1191645;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【1】合算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [360000];
    const years = [3];
    const expectedSimpleInterest = 1080000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【2】複利計算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [360000];
    const years = [3];
    const rate = 1.05;
    const expectedCompoundInterest = 2522913;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【2】合算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [360000];
    const years = [3];
    const expectedSimpleInterest = 2230000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【3】複利計算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const rate = 1.05;
    const expectedCompoundInterest = 12377555;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【3】合算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const expectedSimpleInterest = 8280000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【4】複利計算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const rate = 1.05;
    const expectedCompoundInterest = 14887861;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【4】合算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const expectedSimpleInterest = 9430000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【5】複利計算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [240000, 360000, 480000, 600000];
    const years = [1, 2, 3, 3];
    const rate = 1.05;
    const expectedCompoundInterest = 5236137;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【5】合算が正しく行われるか', () => {
    const initialAsset = 0;
    const yearlyAmounts = [240000, 360000, 480000, 600000];
    const years = [1, 2, 3, 3];
    const expectedSimpleInterest = 4200000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【6】複利計算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [240000, 360000, 480000, 600000];
    const years = [1, 2, 3, 3];
    const rate = 1.05;
    const expectedCompoundInterest = 7020165;

    const result = service['compoundInterestCalc'](initialAsset, yearlyAmounts, years, rate);

    expect(Math.trunc(result)).toEqual(expectedCompoundInterest);
  });

  it('【6】合算が正しく行われるか', () => {
    const initialAsset = 1150000;
    const yearlyAmounts = [240000, 360000, 480000, 600000];
    const years = [1, 2, 3, 3];
    const expectedSimpleInterest = 5350000;

    const result = service['simpleInterestCalc'](initialAsset, yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【1】正しく計算が行われ、期待通りのデータが取れるか', () => {
    const input: Input = {
      initialAsset: 0,
      amounts: [3, 4, 5],
      years: [3, 5, 8],
      rate: 5,
    };

    const expectedCompoundInterest = 12377555;
    const expectedSimpleInterest = 8280000;
    const expectedDiff = expectedCompoundInterest - expectedSimpleInterest;

    const result = service.tsumitateEasyCalculate(input);

    expect(Math.trunc(result.compoundInterestCalcResult)).toEqual(expectedCompoundInterest);
    expect(result.simpleInterestCalcResult).toEqual(expectedSimpleInterest);
    expect(Math.trunc(result.diff)).toEqual(expectedDiff);
  });

  it('【2】正しく計算が行われ、期待通りのデータが取れるか', () => {
    const input: Input = {
      initialAsset: 115,
      amounts: [3, 4, 5],
      years: [3, 5, 8],
      rate: 5,
    };

    const expectedCompoundInterest = 14887861;
    const expectedSimpleInterest = 9430000;
    const expectedDiff = expectedCompoundInterest - expectedSimpleInterest;

    const result = service.tsumitateEasyCalculate(input);

    expect(Math.trunc(result.compoundInterestCalcResult)).toEqual(expectedCompoundInterest);
    expect(result.simpleInterestCalcResult).toEqual(expectedSimpleInterest);
    expect(Math.trunc(result.diff)).toEqual(expectedDiff);
  });
});
