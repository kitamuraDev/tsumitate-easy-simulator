export type Input = {
  amounts: number[];
  years: number[];
  rate: number;
};

export type Output = {
  compoundInterestCalcResult: number;
  simpleInterestCalcResult: number;
  diff: number;
};

export type Tsumitate = {
  id?: number;
  input: Input;
  output: Output;
};
