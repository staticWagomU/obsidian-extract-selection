// ============================================================
// Type Definitions (DO NOT MODIFY - request human review for schema changes)
// ============================================================

// PBI lifecycle: draft (idea) -> refining (gathering info) -> ready (can start) -> done
type PBIStatus = "draft" | "refining" | "ready" | "done";

// Sprint lifecycle
type SprintStatus = "planning" | "in_progress" | "review" | "done" | "cancelled";

// TDD cycle: pending -> red (test written) -> green (impl done) -> refactoring -> completed
type SubtaskStatus = "pending" | "red" | "green" | "refactoring" | "completed";

// behavioral = changes observable behavior, structural = refactoring only
type SubtaskType = "behavioral" | "structural";

// Commits happen only after tests pass (green/refactoring), never on red
type CommitPhase = "green" | "refactoring";

// When to execute retrospective actions:
//   immediate: Apply within Retrospective (non-production code, single logical change)
//   sprint: Add as subtask to next sprint (process improvements)
//   product: Add as new PBI to Product Backlog (feature additions)
type ImprovementTiming = "immediate" | "sprint" | "product";

type ImprovementStatus = "active" | "completed" | "abandoned";

interface SuccessMetric { metric: string; target: string; }
interface ProductGoal { statement: string; success_metrics: SuccessMetric[]; }
interface AcceptanceCriterion { criterion: string; verification: string; }
interface UserStory { role: string; capability: string; benefit: string; }
interface PBI { id: string; story: UserStory; acceptance_criteria: AcceptanceCriterion[]; status: PBIStatus; }
interface Commit { hash: string; message: string; phase: CommitPhase; }
interface Subtask { test: string; implementation: string; type: SubtaskType; status: SubtaskStatus; commits: Commit[]; notes: string[]; }
interface Sprint { number: number; pbi_id: string; goal: string; status: SprintStatus; subtasks: Subtask[]; }
interface DoDCheck { name: string; run: string; }
interface DefinitionOfDone { checks: DoDCheck[]; }
interface Improvement { action: string; timing: ImprovementTiming; status: ImprovementStatus; outcome: string | null; }
interface Retrospective { sprint: number; improvements: Improvement[]; }
interface ScrumDashboard { product_goal: ProductGoal; product_backlog: PBI[]; sprint: Sprint | null; definition_of_done: DefinitionOfDone; completed: Sprint[]; retrospectives: Retrospective[]; }

// ============================================================
// Dashboard Data (AI edits this section)
// ============================================================

const scrum: ScrumDashboard = {
  product_goal: {
    statement: "モバイルユーザーが選択テキストからテンプレート付きの新規ノートを簡単に作成できるようにする",
    success_metrics: [
      { metric: "全PBI完了", target: "16件のPBIすべてが done ステータス" },
      { metric: "モバイル動作", target: "iOS/Androidで遅延なく動作" },
      { metric: "テストカバレッジ", target: "ユーティリティ関数のカバレッジ80%以上" },
    ],
  },

  product_backlog: [
    {
      id: "PBI-007",
      story: { role: "ユーザー", capability: "テンプレートフォルダ内のファイル一覧を取得・選択したい", benefit: "使いたいテンプレートを素早く見つけられるようにするため" },
      acceptance_criteria: [
        { criterion: "指定フォルダ内の.mdファイル一覧が取得できる", verification: "npm test -- --run -t 'getTemplateFiles.*basic'" },
        { criterion: "サブフォルダ内のファイルも再帰的に含まれる", verification: "npm test -- --run -t 'getTemplateFiles.*recursive'" },
        { criterion: "空のフォルダまたは存在しないフォルダの場合、空配列を返す", verification: "npm test -- --run -t 'getTemplateFiles.*empty'" },
      ],
      status: "done",
    },
    {
      id: "PBI-008",
      story: { role: "ユーザー", capability: "テンプレートを適用して新規ノートを作成したい", benefit: "一貫したフォーマットでノートを作成できるようにするため" },
      acceptance_criteria: [
        { criterion: "{{selection}}が選択テキストで置換される", verification: "npm test -- --run -t 'applyTemplate.*selection'" },
        { criterion: "{{date}}が現在日時で置換される（yyyy-MM-dd HH:mm:ss形式）", verification: "npm test -- --run -t 'applyTemplate.*date'" },
        { criterion: "{{title}}がファイル名で置換される", verification: "npm test -- --run -t 'applyTemplate.*title'" },
        { criterion: "複数のプレースホルダーが同時に処理される", verification: "npm test -- --run -t 'applyTemplate.*multiple'" },
      ],
      status: "ready",
    },
    {
      id: "PBI-009",
      story: { role: "ユーザー", capability: "「テンプレートなし」で選択範囲のみの新規ノートを作成したい", benefit: "シンプルな抽出をしたいときにテンプレートが不要なため" },
      acceptance_criteria: [
        { criterion: "選択テキストがそのままファイル内容として返される", verification: "npm test -- --run -t 'createNoteContent.*noTemplate'" },
        { criterion: "共通インデントが削除される（removeCommonIndent統合）", verification: "npm test -- --run -t 'createNoteContent.*indent'" },
      ],
      status: "ready",
    },
    {
      id: "PBI-010",
      story: { role: "ユーザー", capability: "Aliasをフロントマターに追加・マージしたい", benefit: "ノートに別名を付けて検索しやすくするため" },
      acceptance_criteria: [
        { criterion: "フロントマターがない場合、aliasesが新規作成される", verification: "npm test -- --run -t 'addFrontmatterAlias.*new'" },
        { criterion: "既存フロントマターがある場合、aliasesがマージされる", verification: "npm test -- --run -t 'addFrontmatterAlias.*merge'" },
        { criterion: "既存aliasesがある場合、重複なく追加される", verification: "npm test -- --run -t 'addFrontmatterAlias.*existing'" },
        { criterion: "不正なYAMLの場合、エラーを適切にハンドリングする", verification: "npm test -- --run -t 'addFrontmatterAlias.*error'" },
      ],
      status: "ready",
    },
    {
      id: "PBI-012",
      story: { role: "ユーザー", capability: "モーダルUIで抽出操作を行いたい", benefit: "視覚的に分かりやすく操作できるようにするため" },
      acceptance_criteria: [
        { criterion: "モーダルが開閉できる", verification: "手動テスト: コマンド実行でモーダルが開く" },
        { criterion: "テンプレート選択UIが表示される", verification: "手動テスト: ドロップダウンでテンプレート選択可能" },
        { criterion: "ファイル名入力フィールドにデフォルト値が表示される", verification: "手動テスト: 日付形式のデフォルト値が表示" },
        { criterion: "作成ボタンで新規ファイルが作成される", verification: "手動テスト: ボタンクリックでファイル作成" },
      ],
      status: "draft",
    },
    {
      id: "PBI-013",
      story: { role: "ユーザー", capability: "新規ノート作成後に選択範囲がリンクに置換されてほしい", benefit: "元のノートから新規ノートへ簡単にアクセスできるようにするため" },
      acceptance_criteria: [
        { criterion: "選択範囲がマークダウンリンクに置換される", verification: "手動テスト: 選択テキストがリンクに変わる" },
        { criterion: "置換後のカーソル位置が適切", verification: "手動テスト: リンクの末尾にカーソルが移動" },
      ],
      status: "draft",
    },
    {
      id: "PBI-014",
      story: { role: "ユーザー", capability: "コマンドパレットから機能を呼び出したい", benefit: "キーボードで素早くアクセスできるようにするため" },
      acceptance_criteria: [
        { criterion: "コマンドパレットに「Extract selection to new note」が表示される", verification: "手動テスト: Ctrl/Cmd+Pでコマンド検索可能" },
        { criterion: "コマンド実行でモーダルが開く", verification: "手動テスト: コマンド選択でモーダル表示" },
      ],
      status: "draft",
    },
    {
      id: "PBI-015",
      story: { role: "ユーザー", capability: "コンテキストメニューから機能を呼び出したい", benefit: "右クリックで直感的にアクセスできるようにするため" },
      acceptance_criteria: [
        { criterion: "右クリックメニューに「Extract selection」が表示される", verification: "手動テスト: テキスト選択後の右クリックでメニュー表示" },
        { criterion: "メニュー選択でモーダルが開く", verification: "手動テスト: メニュー選択でモーダル表示" },
      ],
      status: "draft",
    },
    {
      id: "PBI-016",
      story: { role: "ユーザー", capability: "manifest.jsonとREADMEが正しく設定されていてほしい", benefit: "プラグインを正しくインストール・理解できるようにするため" },
      acceptance_criteria: [
        { criterion: "manifest.jsonのidが適切に設定されている", verification: "grep -q 'extract-selection' manifest.json" },
        { criterion: "manifest.jsonのisDesktopOnlyがfalse", verification: "grep -q '\"isDesktopOnly\": false' manifest.json" },
        { criterion: "README.mdに使用方法が記載されている", verification: "test -f README.md && grep -q '使用方法\\|Usage' README.md" },
      ],
      status: "draft",
    },
  ],

  sprint: null,

  definition_of_done: {
    checks: [
      { name: "Tests pass", run: "npm test -- --run" },
      { name: "Lint passes", run: "npm run lint" },
      { name: "Format check", run: "npm run format:check" },
      { name: "Types valid", run: "npx tsc -noEmit -skipLibCheck" },
      { name: "Build succeeds", run: "npm run build" },
    ],
  },

  completed: [
    { number: 1, pbi_id: "PBI-001", goal: "vitest環境構築", status: "done", subtasks: [] },
    { number: 2, pbi_id: "PBI-002", goal: "型定義作成", status: "done", subtasks: [] },
    { number: 3, pbi_id: "PBI-I18N", goal: "i18n実装", status: "done", subtasks: [] },
    { number: 4, pbi_id: "PBI-003", goal: "設定の保存・読み込み機能実装", status: "done", subtasks: [] },
    { number: 5, pbi_id: "PBI-004", goal: "日付フォーマットによるファイル名自動生成", status: "done", subtasks: [] },
    { number: 6, pbi_id: "PBI-005", goal: "ファイル名重複時の連番付与", status: "done", subtasks: [] },
    { number: 7, pbi_id: "PBI-006", goal: "共通インデント削除機能", status: "done", subtasks: [] },
    { number: 8, pbi_id: "PBI-011", goal: "マークダウンリンク生成機能", status: "done", subtasks: [] },
    {
      number: 9,
      pbi_id: "PBI-007",
      goal: "テンプレートフォルダ内のファイル一覧取得機能の実装",
      status: "done",
      subtasks: [
        {
          test: "指定フォルダ内の.mdファイル一覧が取得できることをテストする",
          implementation: "getTemplateFiles関数で基本的なファイル一覧取得を実装",
          type: "behavioral",
          status: "completed",
          commits: [{ hash: "d36fd6e", message: "feat(template): add basic template file listing (AC1)", phase: "green" }],
          notes: ["AC1: 指定フォルダ内の.mdファイル一覧が取得できる"],
        },
        {
          test: "サブフォルダ内のファイルも再帰的に含まれることをテストする",
          implementation: "getTemplateFiles関数に再帰的なファイル探索機能を追加",
          type: "behavioral",
          status: "completed",
          commits: [{ hash: "864d47e", message: "feat(template): add recursive file search (AC2)", phase: "green" }],
          notes: ["AC2: サブフォルダ内のファイルも再帰的に含まれる"],
        },
        {
          test: "空のフォルダまたは存在しないフォルダの場合、空配列を返すことをテストする",
          implementation: "getTemplateFiles関数にエッジケース処理を追加",
          type: "behavioral",
          status: "completed",
          commits: [{ hash: "9e70e18", message: "test(template): add edge case tests (AC3)", phase: "green" }],
          notes: ["AC3: 空のフォルダまたは存在しないフォルダの場合、空配列を返す"],
        },
        {
          test: "既存のテストケースで回帰がないことを確認",
          implementation: "コードの構造改善とパフォーマンス最適化",
          type: "structural",
          status: "completed",
          commits: [{ hash: "89be77c", message: "refactor(template): extract markdown extension constant", phase: "refactoring" }],
          notes: ["リファクタリング: コードの可読性とメンテナンス性の向上"],
        },
      ],
    },
  ],

  retrospectives: [
    { sprint: 1, improvements: [{ action: "サンプルコードリネーム", timing: "product", status: "active", outcome: null }] },
    { sprint: 4, improvements: [
      { action: "関連設定の個別コミット", timing: "sprint", status: "active", outcome: null },
      { action: "Parameterized Testパターン導入", timing: "sprint", status: "completed", outcome: "Sprint 5で適用成功" },
    ]},
    { sprint: 5, improvements: [
      { action: "AC-実装増分の対応付け明確化", timing: "sprint", status: "completed", outcome: "Sprint 6で適用" },
    ]},
    { sprint: 6, improvements: [
      { action: "エッジケースの網羅的テスト設計", timing: "sprint", status: "completed", outcome: "Sprint 7で適用成功" },
      { action: "統合テストで組み合わせパターン明示", timing: "sprint", status: "completed", outcome: "Sprint 7で適用成功" },
    ]},
    { sprint: 7, improvements: [
      { action: "継続的改善の定着確認", timing: "sprint", status: "completed", outcome: "プロセス改善が効果的に機能" },
    ]},
    { sprint: 8, improvements: [
      { action: "関数統合を見据えた初期設計", timing: "sprint", status: "active", outcome: null },
      { action: "テストケースの段階的増分追加", timing: "sprint", status: "active", outcome: null },
    ]},
  ],
};

// JSON output (deno run scrum.ts | jq for queries)
console.log(JSON.stringify(scrum, null, 2));
