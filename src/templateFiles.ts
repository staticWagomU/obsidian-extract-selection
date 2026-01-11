import { TFolder, TFile, Vault } from "obsidian";

/**
 * Get list of template files in the specified folder
 * @param vault - Obsidian Vault instance
 * @param folderPath - Path to the template folder
 * @returns Array of file paths for .md files
 */
export function getTemplateFiles(vault: Vault, folderPath: string): string[] {
	const folder = vault.getAbstractFileByPath(folderPath);

	if (!folder || !(folder instanceof TFolder)) {
		return [];
	}

	return collectFilesRecursively(folder);
}

/**
 * Recursively collect .md files from a folder and its subfolders
 * @param folder - Folder to search
 * @returns Array of file paths for .md files
 */
function collectFilesRecursively(folder: TFolder): string[] {
	const files: string[] = [];

	for (const child of folder.children) {
		if (child instanceof TFile && child.extension === "md") {
			files.push(child.path);
		} else if (child instanceof TFolder) {
			files.push(...collectFilesRecursively(child));
		}
	}

	return files;
}
