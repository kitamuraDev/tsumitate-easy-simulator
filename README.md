# アプリケーションについて

- 資産運用のシュミレーションを行うためのアプリケーション
- 機能としては「初期資産額」と「想定利回り」と「毎月積立額」と「積立期間」を入力すると最終評価額を計算してくれるというもの
- 基本機能は、一般的な同種のアプリと変わらないが、当アプリでは`毎月積立額（積立期間）を3回まで後から変更するパターンに対応`している
- また、シュミレーション結果は履歴に残るため、履歴ページに遷移すれば過去のシュミレーション結果を参照し、比較することができる

## 使用技術

### 言語

![Node.js](https://img.shields.io/badge/Node-v22.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.8.3-blue)

### パッケージマネージャー

![npm](https://img.shields.io/badge/npm-v10.5.1-blue)

### フレームワーク

![Angular](https://img.shields.io/badge/Angular-v20.0.4-blue)

### ライブラリ

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.0-blue)
![Flowbite](https://img.shields.io/badge/Flowbite-v2.2.1-blue)
![Dexie](https://img.shields.io/badge/Dexie-v3.2.4-blue)

### テスト

![Vitest](https://img.shields.io/badge/Vitest-v3.2.4-blue)
![Testing Library Angular](https://img.shields.io/badge/Testing_Library_Angular-v17.3.5-blue)

### リンター・フォーマッター

![Biome](https://img.shields.io/badge/Biome-v1.9.4-blue)

### CI

![Lefthook](https://img.shields.io/badge/Lefthook-v1.11.9-blue)

### ホスティング

![Vercel](https://img.shields.io/badge/Vercel-Supported-blue)

## セットアップ

1. `git clone https://github.com/kitamuraDev/tsumitate-easy-simulator.git`
2. `cd`コマンドでプロジェクトへ移動
3. `npm install`
4. `npm run prepare`
5. `npm run dev`

## リリースタグ更新

1. `package.json > version`を更新
2. `git commit`
3. `git tag vn.n.n`
4. `git push origin main --tags`
