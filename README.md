# アプリケーションについて

- 資産運用のシュミレーションを行うためのアプリケーション
- 機能としては「初期資産額」と「想定利回り」と「毎月積立額」と「積立期間」を入力すると最終評価額を計算してくれるというもの
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
4. `npm run dev`
