/**
 * Generate a markdown link
 * @param targetPath - The path to the target file
 * @param fromPath - The path from which the link is created
 * @param alias - Optional alias for the link text
 * @returns Markdown link string
 */
export function generateMarkdownLink(targetPath: string, fromPath: string, alias?: string): string {
	const linkText = alias || extractFilename(targetPath);
	const relativePath = calculateRelativePath(fromPath, targetPath);
	return `[${linkText}](${relativePath})`;
}

/**
 * Extract filename without extension from a path
 * @param path - File path
 * @returns Filename without extension
 */
function extractFilename(path: string): string {
	const filename = path.split("/").pop() || "";
	return filename.replace(/\.md$/, "");
}

/**
 * Calculate relative path from one file to another
 * @param fromPath - The path from which the link is created
 * @param toPath - The path to the target file
 * @returns Relative path from fromPath to toPath
 */
export function calculateRelativePath(fromPath: string, toPath: string): string {
	const fromParts = fromPath.split("/");
	const toParts = toPath.split("/");

	// Remove the filename from fromPath (we only need the directory)
	fromParts.pop();

	// Find the common ancestor
	let commonLength = 0;
	const minLength = Math.min(fromParts.length, toParts.length);
	for (let i = 0; i < minLength; i++) {
		if (fromParts[i] === toParts[i]) {
			commonLength++;
		} else {
			break;
		}
	}

	// Build the relative path
	const upLevels = fromParts.length - commonLength;
	const remainingPath = toParts.slice(commonLength);

	const upPart = "../".repeat(upLevels);
	const downPart = remainingPath.join("/");

	return upPart + downPart;
}
