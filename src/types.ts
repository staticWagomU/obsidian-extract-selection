/**
 * Extract Selection Plugin Settings
 *
 * Settings for the Extract Selection plugin that allows users
 * to create new notes from selected text with template support.
 */
export interface ExtractSelectionSettings {
	/** Folder path where template files are stored */
	templateFolder: string;

	/** Folder path where new notes will be created */
	outputFolder: string;

	/** Date format for default filename (e.g., "yyyyMMddHHmmss") */
	defaultFilenameFormat: string;

	/** Whether to add alias to frontmatter by default */
	addAliasToFrontmatter: boolean;

	/** Whether to remove common indent from selection by default */
	removeCommonIndent: boolean;
}

/** Default settings values */
export const DEFAULT_SETTINGS: ExtractSelectionSettings = {
	templateFolder: "Templates",
	outputFolder: "",
	defaultFilenameFormat: "yyyyMMddHHmmss",
	addAliasToFrontmatter: true,
	removeCommonIndent: false,
};
