import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
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
    const yearlyAmounts = [360000];
    const years = [3];
    const rate = 1.05;
    const expectedCompoundInterest = 1191645;

    const result = service['compoundInterestCalc'](yearlyAmounts, years, rate);

    expect(result).toBeCloseTo(expectedCompoundInterest);
  });

  it('【1】単利計算（シンプルな合算）が正しく行われるか', () => {
    const yearlyAmounts = [360000];
    const years = [3];
    const expectedSimpleInterest = 1080000;

    const result = service['simpleInterestCalc'](yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('【2】複利計算が正しく行われるか', () => {
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const rate = 1.05;
    const expectedCompoundInterest = 12377555.44517;

    const result = service['compoundInterestCalc'](yearlyAmounts, years, rate);

    expect(result).toBeCloseTo(expectedCompoundInterest);
  });

  it('【2】単利計算（シンプルな合算）が正しく行われるか', () => {
    const yearlyAmounts = [360000, 480000, 600000];
    const years = [3, 5, 8];
    const expectedSimpleInterest = 8280000;

    const result = service['simpleInterestCalc'](yearlyAmounts, years);

    expect(result).toEqual(expectedSimpleInterest);
  });

  it('正しく計算が行われ、期待通りのデータが取れるか', () => {
    const monthlyAmounts = [3, 4, 5];
    const years = [3, 5, 8];
    const rate = 5;

    const expectedCompoundInterest = 12377555.44517;
    const expectedSimpleInterest = 8280000;
    const expectedDiff = expectedCompoundInterest - expectedSimpleInterest;

    const result = service.tsumitateEasyCalculate(monthlyAmounts, years, rate);

    expect(result.compoundInterestCalcResult).toBeCloseTo(expectedCompoundInterest);
    expect(result.simpleInterestCalcResult).toEqual(expectedSimpleInterest);
    expect(result.diff).toBeCloseTo(expectedDiff);
  });
});
