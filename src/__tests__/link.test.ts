import { describe, expect, test } from "vitest";
import { generateMarkdownLink } from "../link";

describe("generateMarkdownLink", () => {
	describe("Alias入力時は[Alias](path.md)形式になる (AC1)", () => {
		test.each([
			{
				description: "基本的なalias付きリンク",
				targetPath: "folder/note.md",
				fromPath: "current.md",
				alias: "My Note",
				expected: "[My Note](folder/note.md)",
			},
			{
				description: "特殊文字を含むalias",
				targetPath: "folder/note.md",
				fromPath: "current.md",
				alias: "Note: Important!",
				expected: "[Note: Important!](folder/note.md)",
			},
		])("$description", ({ targetPath, fromPath, alias, expected }) => {
			expect(generateMarkdownLink(targetPath, fromPath, alias)).toBe(expected);
		});
	});

	describe("Alias未入力時は[filename](path.md)形式になる (AC2)", () => {
		test.each([
			{
				description: "拡張子なしのファイル名をリンクテキストに使用",
				targetPath: "folder/my-note.md",
				fromPath: "current.md",
				expected: "[my-note](folder/my-note.md)",
			},
			{
				description: "ハイフン区切りのファイル名",
				targetPath: "folder/important-note.md",
				fromPath: "current.md",
				expected: "[important-note](folder/important-note.md)",
			},
			{
				description: "ルートディレクトリのファイル",
				targetPath: "note.md",
				fromPath: "current.md",
				expected: "[note](note.md)",
			},
		])("$description", ({ targetPath, fromPath, expected }) => {
			expect(generateMarkdownLink(targetPath, fromPath)).toBe(expected);
		});
	});
});
