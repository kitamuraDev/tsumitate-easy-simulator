import { TruncateToTenThousandsPipe } from './truncate-to-ten-thousands.pipe';

describe('TruncateToTenThousandsPipe', () => {
  const pipe = new TruncateToTenThousandsPipe();

  it('50000の場合、万の位以下を切り捨てて、"5"になるか', () => {
    const amount = 50000;
    const expectedFormattedAmount = '5';

    const formattedAmount = pipe.transform(amount);

    expect(formattedAmount).toBe(expectedFormattedAmount);
  });

  it('378000の場合、万の位以下を切り捨てて、"37"になるか', () => {
    const amount = 378000;
    const expectedFormattedAmount = '37';

    const formattedAmount = pipe.transform(amount);

    expect(formattedAmount).toBe(expectedFormattedAmount);
  });

  it('1280000の場合、万の位以下を切り捨てて、"128"になるか', () => {
    const amount = 1280000;
    const expectedFormattedAmount = '128';

    const formattedAmount = pipe.transform(amount);

    expect(formattedAmount).toBe(expectedFormattedAmount);
  });

  it('12825000の場合、万の位以下を切り捨てて、"1,282"になるか', () => {
    const amount = 12825000;
    const expectedFormattedAmount = '1,282';

    const formattedAmount = pipe.transform(amount);

    expect(formattedAmount).toBe(expectedFormattedAmount);
  });
});
