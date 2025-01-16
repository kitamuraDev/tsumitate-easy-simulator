import { ToPercentagePipe } from './to-percentage.pipe';

describe('ToPercentagePipe', () => {
  const pipe = new ToPercentagePipe();

  it('合算と複利計算の結果が同じ場合、"+0.00%"を返すか', () => {
    const expectedPercentage = '+0.00%';
    const actualPercentage = pipe.transform(1000000, 1000000);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より25%多い場合、"+25.00%"を返すか', () => {
    const expectedPercentage = '+25.00%';
    const actualPercentage = pipe.transform(1000000, 1250000);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より50%多い場合、"+50.00%"を返すか', () => {
    const expectedPercentage = '+50.00%';
    const actualPercentage = pipe.transform(1000000, 1500000);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より100%多い場合、"+100.00%"を返すか', () => {
    const expectedPercentage = '+100.00%';
    const actualPercentage = pipe.transform(1000000, 2000000);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より7.51%多い場合、"+7.51%"を返すか', () => {
    const expectedPercentage = '+7.51%';
    const actualPercentage = pipe.transform(1000000, 1075100);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より17.9%多い場合、"+17.90%"を返すか', () => {
    const expectedPercentage = '+17.90%';
    const actualPercentage = pipe.transform(7150000, 8430000);

    expect(actualPercentage).toBe(expectedPercentage);
  });

  it('複利計算の結果が合算結果より72.5%多い場合、"+72.50%"を返すか', () => {
    const expectedPercentage = '+72.50%';
    const actualPercentage = pipe.transform(1000000, 1725000);

    expect(actualPercentage).toBe(expectedPercentage);
  });
});
