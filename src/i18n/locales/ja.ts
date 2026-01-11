/**
 * Japanese translations
 */
export const ja = {
	// Plugin
	pluginName: "選択範囲を抽出",

	// Commands
	commandExtractSelection: "選択範囲を新しいノートに抽出",

	// Modal
	modalTitle: "選択範囲を新しいノートに抽出",
	modalTemplate: "テンプレート",
	modalNoTemplate: "テンプレートなし",
	modalFilename: "ファイル名",
	modalAlias: "エイリアス",
	modalAliasPlaceholder: "タイトルを入力（任意）",
	modalAddAliasToFrontmatter: "エイリアスをフロントマターに追加",
	modalRemoveCommonIndent: "共通インデントを削除",
	modalCancel: "キャンセル",
	modalCreate: "ノートを作成",

	// Settings
	settingsTitle: "選択範囲抽出 設定",
	settingsTemplateFolder: "テンプレートフォルダ",
	settingsTemplateFolderDesc: "テンプレートファイルが格納されているフォルダ",
	settingsOutputFolder: "出力フォルダ",
	settingsOutputFolderDesc: "新しいノートの保存先フォルダ",
	settingsDefaultFilenameFormat: "デフォルトファイル名フォーマット",
	settingsDefaultFilenameFormatDesc: "使用可能: yyyy, MM, dd, HH, mm, ss",
	settingsAddAliasToFrontmatter: "デフォルトでエイリアスをフロントマターに追加",
	settingsRemoveCommonIndent: "デフォルトで共通インデントを削除",

	// Messages
	msgNoSelection: "テキストが選択されていません",
	msgNoteCreated: "ノートを作成しました: {filename}",
	msgError: "エラー: {message}",
} as const;
