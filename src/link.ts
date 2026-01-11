/**
 * Generate a markdown link
 * @param targetPath - The path to the target file
 * @param fromPath - The path from which the link is created
 * @param alias - Optional alias for the link text
 * @returns Markdown link string
 */
export function generateMarkdownLink(
	targetPath: string,
	fromPath: string,
	alias?: string,
): string {
	// For now, just use the targetPath as-is (will add relative path calculation later)
	const linkText = alias || "";
	return `[${linkText}](${targetPath})`;
}
