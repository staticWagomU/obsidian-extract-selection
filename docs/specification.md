# Obsidian Extract Selection Plugin 仕様書

## 概要

選択範囲のテキストを抽出し、テンプレートを適用して新規ノートを作成するObsidianプラグイン。
Core機能の「Note Composer」を拡張し、テンプレート選択とファイル名入力をモーダルで行える。

---

## ターゲットユーザー

**メインユーザー: モバイル（iOS/Android）ユーザー**

このプラグインは主にモバイル環境での使用を想定して設計する。

### モバイル対応の設計方針

- **タッチ操作に最適化**: ボタンやタップ領域は十分なサイズを確保
- **シンプルなUI**: モバイル画面でも見やすいレイアウト
- **パフォーマンス**: モバイルデバイスでも軽快に動作するよう最適化
- **manifest.json**: `isDesktopOnly: false` を設定してモバイル対応を明示

### 実装上の考慮事項

- Node.js専用APIは使用しない（`fs`, `path`など）
- ObsidianのVault APIを使用してファイル操作を行う
- 重い処理は非同期で実行し、UIをブロックしない
- モーダルのスクロールを適切に処理する

---

## 機能一覧

### 1. メイン機能: 選択範囲から新規ノート作成

**トリガー方法:**
- コマンドパレット（Ctrl/Cmd + P）
- 右クリックコンテキストメニュー

**動作フロー:**
1. ユーザーがエディタ内でテキストを選択
2. コマンドを実行 → モーダルが開く
3. モーダルで以下を入力/選択:
   - テンプレートファイル（ドロップダウン or ファイルサジェスト）
   - ファイル名（デフォルト値あり）
   - Alias（オプション）
   - 共通インデント削除（チェックボックス）
4. 「作成」ボタンで実行
5. 新規ファイルが作成され、元の選択範囲がリンクに置換される

### 2. モーダルUI

```
┌─────────────────────────────────────────────┐
│  Extract Selection to New Note              │
├─────────────────────────────────────────────┤
│                                             │
│  Template:  [▼ テンプレート選択 _________ ] │
│             ☐ テンプレートなし              │
│                                             │
│  Filename:  [20241231120000______________ ] │
│                                             │
│  Alias:     [タイトルを入力（任意）______ ] │
│             ☐ Aliasをフロントマターに追加   │
│                                             │
│  Options:                                   │
│             ☐ 共通インデントを削除          │
│                                             │
│         [ Cancel ]  [ Create Note ]         │
└─────────────────────────────────────────────┘
```

**モーダル要素:**
- **Template**: テンプレートフォルダ内のファイルをサジェスト表示
- **テンプレートなし**: チェック時、選択範囲のみで新規ファイル作成
- **Filename**: デフォルトは設定で指定した形式（デフォルト: `yyyyMMddHHmmss`）
- **Alias**: オプション入力フィールド
- **Aliasをフロントマターに追加**: チェック時、`aliases`プロパティを追加
- **共通インデントを削除**: 選択範囲の全行に共通するインデントを削除

### 3. テンプレート処理

**プレースホルダー:**
- `{{selection}}`: 選択範囲のテキストで置換される

**テンプレート例:**
```markdown
---
created: {{date}}
---

## 内容

{{selection}}

## 参照
```

**テンプレートなし選択時:**
- 選択範囲のテキストがそのまま新規ファイルの内容になる

### 4. Alias機能

**Aliasが入力された場合:**
1. 新規ファイルのフロントマターに`aliases`を追加/マージ
2. リンクの表示名として使用

**フロントマター処理:**
```yaml
# 既存フロントマターがある場合
---
existing: value
aliases:
  - 入力されたAlias
---

# フロントマターがない場合
---
aliases:
  - 入力されたAlias
---
```

### 5. リンク形式

**マークダウンリンク形式を使用:**
- Alias入力時: `[タイトル名](ファイルパス.md)`
- Alias未入力時: `[ファイル名](ファイルパス.md)`

**相対パス vs 絶対パス:**
- 保存先フォルダと元ファイルの位置関係に基づいて相対パスを計算

### 6. 共通インデント削除

**動作:**
選択範囲の全行に共通するインデント（スペース/タブ）を削除

**例:**
```
選択前:
    - Item A
    - Item B
      - Sub item

削除後:
- Item A
- Item B
  - Sub item
```

**アルゴリズム:**
1. 選択範囲を行に分割
2. 空行を除く各行の先頭インデント量を取得
3. 最小インデント量を計算
4. 全行からその量のインデントを削除

### 7. ファイル名重複処理

**同名ファイルが存在する場合:**
- 連番を追加: `filename.md` → `filename-1.md` → `filename-2.md`

---

## プラグイン設定

### 設定項目

| 設定名 | 型 | デフォルト値 | 説明 |
|--------|-----|-------------|------|
| `templateFolder` | string | `"Templates"` | テンプレートファイルが格納されているフォルダパス |
| `outputFolder` | string | `""` (Vaultルート) | 新規ファイルの保存先フォルダ |
| `defaultFilenameFormat` | string | `"yyyyMMddHHmmss"` | デフォルトファイル名の日付フォーマット |
| `addAliasToFrontmatter` | boolean | `true` | Alias入力時にフロントマターへ追加するかのデフォルト値 |
| `removeCommonIndent` | boolean | `false` | 共通インデント削除のデフォルト値 |

### 設定画面UI

```
┌─────────────────────────────────────────────────┐
│  Extract Selection Settings                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Template Folder                                │
│  [Templates________________________] [Browse]   │
│  テンプレートファイルを格納するフォルダ         │
│                                                 │
│  Output Folder                                  │
│  [Notes/Extracted__________________] [Browse]   │
│  新規ファイルの保存先フォルダ                   │
│                                                 │
│  Default Filename Format                        │
│  [yyyyMMddHHmmss___________________]            │
│  使用可能: yyyy, MM, dd, HH, mm, ss             │
│                                                 │
│  □ Add alias to frontmatter by default          │
│  □ Remove common indent by default              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 実装計画

### ファイル構成

```
src/
├── main.ts                 # プラグインエントリポイント
├── settings.ts             # 設定インターフェース & 設定タブ
├── modal/
│   └── ExtractModal.ts     # メインモーダルUI
├── utils/
│   ├── template.ts         # テンプレート処理
│   ├── filename.ts         # ファイル名生成・重複処理
│   ├── indent.ts           # インデント処理
│   ├── frontmatter.ts      # フロントマター処理
│   └── link.ts             # リンク生成
└── types.ts                # 型定義
```

### 実装ステップ

#### Phase 1: 基盤整備
1. [ ] `types.ts` - 型定義の作成
2. [ ] `settings.ts` - 設定インターフェースと設定タブの実装
3. [ ] `main.ts` - プラグイン基本構造の更新

#### Phase 2: ユーティリティ関数
4. [ ] `utils/filename.ts` - ファイル名生成・重複チェック
5. [ ] `utils/indent.ts` - 共通インデント削除
6. [ ] `utils/template.ts` - テンプレート読み込み・プレースホルダー置換
7. [ ] `utils/frontmatter.ts` - フロントマター解析・Alias追加
8. [ ] `utils/link.ts` - マークダウンリンク生成

#### Phase 3: モーダルUI
9. [ ] `modal/ExtractModal.ts` - モーダルUIの実装

#### Phase 4: 統合
10. [ ] `main.ts` - コマンド登録
11. [ ] `main.ts` - コンテキストメニュー登録
12. [ ] 統合テスト

#### Phase 5: 仕上げ
13. [ ] `manifest.json` - プラグイン情報の更新
14. [ ] `README.md` - ドキュメント作成

---

## 技術詳細

### 使用するObsidian API

```typescript
// ファイル操作
app.vault.create(path, content)
app.vault.read(file)
app.vault.getAbstractFileByPath(path)
app.vault.adapter.exists(path)

// エディタ操作
editor.getSelection()
editor.replaceSelection(text)

// モーダル
Modal, Setting, TextComponent, DropdownComponent, ToggleComponent

// ファイルサジェスト
FuzzySuggestModal または SuggestModal

// メニュー
app.workspace.on('editor-menu', callback)
```

### 日付フォーマット

`date-fns` または自前実装で以下をサポート:
- `yyyy`: 4桁年
- `MM`: 2桁月
- `dd`: 2桁日
- `HH`: 2桁時（24時間）
- `mm`: 2桁分
- `ss`: 2桁秒

---

## 修正対象ファイル

| ファイル | 操作 | 説明 |
|---------|------|------|
| `src/main.ts` | 修正 | プラグインエントリポイント書き換え |
| `src/settings.ts` | 修正 | 設定構造の定義 |
| `src/types.ts` | 新規 | 型定義 |
| `src/modal/ExtractModal.ts` | 新規 | モーダルUI |
| `src/utils/filename.ts` | 新規 | ファイル名ユーティリティ |
| `src/utils/indent.ts` | 新規 | インデント処理 |
| `src/utils/template.ts` | 新規 | テンプレート処理 |
| `src/utils/frontmatter.ts` | 新規 | フロントマター処理 |
| `src/utils/link.ts` | 新規 | リンク生成 |
| `manifest.json` | 修正 | プラグイン情報更新 |
| `README.md` | 修正 | ドキュメント |
