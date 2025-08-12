// biome-ignore format: コメントを揃えたいため
export type Input = {
  initialAsset: number; // 初期資産
  amounts: number[];    // 月間積立投資額
  years: number[];      // 積立期間
  rate: number;         // 年率
};

// biome-ignore format: コメントを揃えたいため
export type Output = {
  compoundInterestCalcResult: number; // 複利計算の結果
  simpleInterestCalcResult: number;   // 合算の結果
  diff: number;                       // 差分
};

// biome-ignore format: コメントを揃えたいため
export type Tsumitate = {
  id?: number;    // 一意のID
  input: Input;   // 入力
  output: Output; // 出力
};
