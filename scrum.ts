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

interface SuccessMetric {
  metric: string;
  target: string;
}

interface ProductGoal {
  statement: string;
  success_metrics: SuccessMetric[];
}

interface AcceptanceCriterion {
  criterion: string;
  verification: string;
}

interface UserStory {
  role: string;
  capability: string;
  benefit: string;
}

interface PBI {
  id: string;
  story: UserStory;
  acceptance_criteria: AcceptanceCriterion[];
  status: PBIStatus;
}

interface Commit {
  hash: string;
  message: string;
  phase: CommitPhase;
}

interface Subtask {
  test: string;
  implementation: string;
  type: SubtaskType;
  status: SubtaskStatus;
  commits: Commit[];
  notes: string[];
}

interface Sprint {
  number: number;
  pbi_id: string;
  goal: string;
  status: SprintStatus;
  subtasks: Subtask[];
}

interface DoDCheck {
  name: string;
  run: string;
}

interface DefinitionOfDone {
  checks: DoDCheck[];
}

interface Improvement {
  action: string;
  timing: ImprovementTiming;
  status: ImprovementStatus;
  outcome: string | null;
}

interface Retrospective {
  sprint: number;
  improvements: Improvement[];
}

interface ScrumDashboard {
  product_goal: ProductGoal;
  product_backlog: PBI[];
  sprint: Sprint | null;
  definition_of_done: DefinitionOfDone;
  completed: Sprint[];
  retrospectives: Retrospective[];
}

// ============================================================
// Dashboard Data (AI edits this section)
// ============================================================

const scrum: ScrumDashboard = {
  product_goal: {
    statement:
      "モバイルユーザーが選択テキストからテンプレート付きの新規ノートを簡単に作成できるようにする",
    success_metrics: [
      {
        metric: "全PBI完了",
        target: "16件のPBIすべてが done ステータス",
      },
      {
        metric: "モバイル動作",
        target: "iOS/Androidで遅延なく動作",
      },
      {
        metric: "テストカバレッジ",
        target: "ユーティリティ関数のカバレッジ80%以上",
      },
    ],
  },

  product_backlog: [
    {
      id: "PBI-I18N",
      story: {
        role: "非日本語ユーザー",
        capability: "プラグインのUIを自分の言語で表示したい",
        benefit: "言語の壁なく直感的に操作できるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "i18n用の翻訳ファイル構造が存在する",
          verification: "test -d src/i18n && echo 'exists'",
        },
        {
          criterion: "日本語(ja)と英語(en)の翻訳ファイルがある",
          verification: "test -f src/i18n/locales/ja.ts && test -f src/i18n/locales/en.ts && echo 'exists'",
        },
        {
          criterion: "Obsidianのロケール設定に基づいて言語が自動選択される",
          verification: "npm test -- --run -t 'i18n.*locale'",
        },
        {
          criterion: "翻訳キーが型安全に参照できる",
          verification: "npx tsc -noEmit -skipLibCheck",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-003",
      story: {
        role: "ユーザー",
        capability: "設定画面でプラグインの動作をカスタマイズしたい",
        benefit: "自分のワークフローに合わせて使えるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "templateFolder設定が保存・読み込みできる",
          verification: "npm test -- --run -t 'templateFolder'",
        },
        {
          criterion: "outputFolder設定が保存・読み込みできる",
          verification: "npm test -- --run -t 'outputFolder'",
        },
        {
          criterion: "defaultFilenameFormat設定が保存・読み込みできる",
          verification: "npm test -- --run -t 'defaultFilenameFormat'",
        },
        {
          criterion: "addAliasToFrontmatter設定が保存・読み込みできる",
          verification: "npm test -- --run -t 'addAliasToFrontmatter'",
        },
        {
          criterion: "removeCommonIndent設定が保存・読み込みできる",
          verification: "npm test -- --run -t 'removeCommonIndent'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-004",
      story: {
        role: "ユーザー",
        capability: "日付フォーマットに基づいたファイル名を自動生成したい",
        benefit: "ファイル名を毎回考えなくて済むようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "yyyyMMddHHmmss形式でファイル名が生成される",
          verification: "npm test -- --run -t 'filename.*yyyyMMddHHmmss'",
        },
        {
          criterion: "カスタムフォーマットが適用される",
          verification: "npm test -- --run -t 'filename.*custom'",
        },
        {
          criterion: "yyyy, MM, dd, HH, mm, ssのプレースホルダーが動作する",
          verification: "npm test -- --run -t 'filename.*placeholder'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-005",
      story: {
        role: "ユーザー",
        capability: "ファイル名が重複した場合に連番が付与されてほしい",
        benefit: "同名ファイルで上書きされないようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "重複時にfilename-1.mdが生成される",
          verification: "npm test -- --run -t 'duplicate.*-1'",
        },
        {
          criterion: "複数重複時にfilename-2, -3...と連番が増える",
          verification: "npm test -- --run -t 'duplicate.*sequential'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-006",
      story: {
        role: "ユーザー",
        capability: "選択範囲の共通インデントを削除したい",
        benefit: "抽出後のノートが正しいインデントになるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "全行に共通する先頭スペースが削除される",
          verification: "npm test -- --run -t 'indent.*space'",
        },
        {
          criterion: "全行に共通する先頭タブが削除される",
          verification: "npm test -- --run -t 'indent.*tab'",
        },
        {
          criterion: "空行は無視して最小インデントが計算される",
          verification: "npm test -- --run -t 'indent.*empty'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-007",
      story: {
        role: "ユーザー",
        capability: "テンプレートフォルダ内のファイル一覧を取得・選択したい",
        benefit: "使いたいテンプレートを素早く見つけられるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "指定フォルダ内の.mdファイル一覧が取得できる",
          verification: "npm test -- --run -t 'template.*list'",
        },
        {
          criterion: "サブフォルダ内のファイルも含まれる",
          verification: "npm test -- --run -t 'template.*subfolder'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-008",
      story: {
        role: "ユーザー",
        capability: "テンプレートを適用して新規ノートを作成したい",
        benefit: "一貫したフォーマットでノートを作成できるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "{{selection}}が選択テキストで置換される",
          verification: "npm test -- --run -t 'template.*selection'",
        },
        {
          criterion: "{{date}}が現在日時で置換される",
          verification: "npm test -- --run -t 'template.*date'",
        },
        {
          criterion: "テンプレートファイルの内容が読み込まれる",
          verification: "npm test -- --run -t 'template.*read'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-009",
      story: {
        role: "ユーザー",
        capability: "「テンプレートなし」で選択範囲のみの新規ノートを作成したい",
        benefit: "シンプルな抽出をしたいときにテンプレートが不要なため",
      },
      acceptance_criteria: [
        {
          criterion: "テンプレートなし選択時、選択テキストがそのままファイル内容になる",
          verification: "npm test -- --run -t 'noTemplate'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-010",
      story: {
        role: "ユーザー",
        capability: "Aliasをフロントマターに追加・マージしたい",
        benefit: "ノートに別名を付けて検索しやすくするため",
      },
      acceptance_criteria: [
        {
          criterion: "フロントマターがない場合、aliasesが新規作成される",
          verification: "npm test -- --run -t 'frontmatter.*new'",
        },
        {
          criterion: "既存フロントマターがある場合、aliasesがマージされる",
          verification: "npm test -- --run -t 'frontmatter.*merge'",
        },
        {
          criterion: "既存aliasesがある場合、追加される",
          verification: "npm test -- --run -t 'frontmatter.*existing'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-011",
      story: {
        role: "ユーザー",
        capability: "相対パスでマークダウンリンクを生成したい",
        benefit: "Vault内でリンクが正しく機能するようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "Alias入力時は[Alias](path.md)形式になる",
          verification: "npm test -- --run -t 'link.*alias'",
        },
        {
          criterion: "Alias未入力時は[filename](path.md)形式になる",
          verification: "npm test -- --run -t 'link.*noAlias'",
        },
        {
          criterion: "相対パスが正しく計算される",
          verification: "npm test -- --run -t 'link.*relative'",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-012",
      story: {
        role: "ユーザー",
        capability: "モーダルUIで抽出操作を行いたい",
        benefit: "視覚的に分かりやすく操作できるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "モーダルが開閉できる",
          verification: "手動テスト: コマンド実行でモーダルが開く",
        },
        {
          criterion: "テンプレート選択UIが表示される",
          verification: "手動テスト: ドロップダウンでテンプレート選択可能",
        },
        {
          criterion: "ファイル名入力フィールドにデフォルト値が表示される",
          verification: "手動テスト: 日付形式のデフォルト値が表示",
        },
        {
          criterion: "作成ボタンで新規ファイルが作成される",
          verification: "手動テスト: ボタンクリックでファイル作成",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-013",
      story: {
        role: "ユーザー",
        capability: "新規ノート作成後に選択範囲がリンクに置換されてほしい",
        benefit: "元のノートから新規ノートへ簡単にアクセスできるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "選択範囲がマークダウンリンクに置換される",
          verification: "手動テスト: 選択テキストがリンクに変わる",
        },
        {
          criterion: "置換後のカーソル位置が適切",
          verification: "手動テスト: リンクの末尾にカーソルが移動",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-014",
      story: {
        role: "ユーザー",
        capability: "コマンドパレットから機能を呼び出したい",
        benefit: "キーボードで素早くアクセスできるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "コマンドパレットに「Extract selection to new note」が表示される",
          verification: "手動テスト: Ctrl/Cmd+Pでコマンド検索可能",
        },
        {
          criterion: "コマンド実行でモーダルが開く",
          verification: "手動テスト: コマンド選択でモーダル表示",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-015",
      story: {
        role: "ユーザー",
        capability: "コンテキストメニューから機能を呼び出したい",
        benefit: "右クリックで直感的にアクセスできるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "右クリックメニューに「Extract selection」が表示される",
          verification: "手動テスト: テキスト選択後の右クリックでメニュー表示",
        },
        {
          criterion: "メニュー選択でモーダルが開く",
          verification: "手動テスト: メニュー選択でモーダル表示",
        },
      ],
      status: "draft",
    },
    {
      id: "PBI-016",
      story: {
        role: "ユーザー",
        capability: "manifest.jsonとREADMEが正しく設定されていてほしい",
        benefit: "プラグインを正しくインストール・理解できるようにするため",
      },
      acceptance_criteria: [
        {
          criterion: "manifest.jsonのidが適切に設定されている",
          verification: "grep -q 'extract-selection' manifest.json",
        },
        {
          criterion: "manifest.jsonのisDesktopOnlyがfalse",
          verification: "grep -q '\"isDesktopOnly\": false' manifest.json",
        },
        {
          criterion: "README.mdに使用方法が記載されている",
          verification: "test -f README.md && grep -q '使用方法\\|Usage' README.md",
        },
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
  ],

  retrospectives: [
    {
      sprint: 1,
      improvements: [
        { action: "サンプルコードリネーム", timing: "product", status: "active", outcome: null },
      ],
    },
    {
      sprint: 2,
      improvements: [],
    },
  ],
};

// JSON output (deno run scrum.ts | jq for queries)
console.log(JSON.stringify(scrum, null, 2));
