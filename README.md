# アプリケーションについて

- `積立NISA（ニーサ）`や`iDeCo（イデコ）`などの積立投資のシュミレーション計算を行うためのアプリケーション
- 機能としては「想定利回り」と「毎月積立額」と「積立期間」を入力すると最終評価額を計算してくれるというもの
- 基本機能は、一般的な同種のアプリと変わらないが、当アプリでは`毎月積立額（積立期間）を3回まで後から変更するパターンに対応`している
- また、シュミレーション結果は履歴に残るため、履歴ページに遷移すれば過去のシュミレーション結果を参照し、比較することができる

## 使用技術

### 言語

![Node.js](https://img.shields.io/badge/Node-v20.9.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.2.2-blue)

### パッケージマネージャー

![npm](https://img.shields.io/badge/npm-v10.1.0-blue)

### ライブラリ

![Angular](https://img.shields.io/badge/Angular-v17.0.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.0-blue)
![Flowbite](https://img.shields.io/badge/Flowbite-v2.2.1-blue)
![Dexie](https://img.shields.io/badge/Dexie-v3.2.4-blue)

### リンター・フォーマッター

![ESLint](https://img.shields.io/badge/ESLint-v8.54.0-blue)
![Prettier](https://img.shields.io/badge/Prettier-v3.1.1-blue)

### ホスティング

![Vercel](https://img.shields.io/badge/Vercel-Supported-blue)

## セットアップ

1. `git clone https://github.com/kitamuraDev/tsumitate-easy-simulator.git`
2. `cd`コマンドでプロジェクトへ移動
3. `npm install`
4. `ng serve --open`

## 【モデル】Input, Output, Tsumitate について

```ts
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
```

- Input
  - 入力。`amounts（積立額）`と`years（積立年数）`は複数の値を受け取る可能性があるため、配列で管理
- Output
  - 入力に対する出力。複利計算が施された`compoundInterestCalcResult`とシンプルな合算値である`simpleInterestCalcResult`とその差分である`diff`を持つ
- Tsumitate
  - 一意の値である`id`と、`Input`,`Output`を持つオブジェクト
