/**
 * English translations
 */
export const en = {
	// Plugin
	pluginName: "Extract Selection",

	// Commands
	commandExtractSelection: "Extract selection to new note",

	// Modal
	modalTitle: "Extract Selection to New Note",
	modalTemplate: "Template",
	modalNoTemplate: "No template",
	modalFilename: "Filename",
	modalAlias: "Alias",
	modalAliasPlaceholder: "Enter title (optional)",
	modalAddAliasToFrontmatter: "Add alias to frontmatter",
	modalRemoveCommonIndent: "Remove common indent",
	modalCancel: "Cancel",
	modalCreate: "Create Note",

	// Settings
	settingsTitle: "Extract Selection Settings",
	settingsTemplateFolder: "Template Folder",
	settingsTemplateFolderDesc: "Folder containing template files",
	settingsOutputFolder: "Output Folder",
	settingsOutputFolderDesc: "Folder where new notes will be created",
	settingsDefaultFilenameFormat: "Default Filename Format",
	settingsDefaultFilenameFormatDesc: "Available: yyyy, MM, dd, HH, mm, ss",
	settingsAddAliasToFrontmatter: "Add alias to frontmatter by default",
	settingsRemoveCommonIndent: "Remove common indent by default",

	// Messages
	msgNoSelection: "No text selected",
	msgNoteCreated: "Note created: {filename}",
	msgError: "Error: {message}",
} as const;

export type TranslationKeys = keyof typeof en;
