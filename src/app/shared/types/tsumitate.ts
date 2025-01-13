// prettier-ignore
export type Input = {
  initialAsset: number; // 初期資産
  amounts: number[];    // 月間積立投資額
  years: number[];      // 積立期間
  rate: number;         // 想定利回り（年率）
};

// prettier-ignore
export type Output = {
  compoundInterestCalcResult: number; // 複利計算の結果
  simpleInterestCalcResult: number;   // 合算の結果
  diff: number;                       // 差分
};

// prettier-ignore
export type Tsumitate = {
  id?: number;    // 一意のID
  input: Input;   // 入力
  output: Output; // 出力
};
