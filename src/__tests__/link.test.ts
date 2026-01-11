import { describe, expect, test } from "vitest";
import { calculateRelativePath, generateMarkdownLink } from "../link";

describe("generateMarkdownLink", () => {
	describe("Alias入力時は[Alias](path.md)形式になる (AC1)", () => {
		test.each([
			{
				description: "基本的なalias付きリンク（相対パス使用）",
				targetPath: "folder/note.md",
				fromPath: "current.md",
				alias: "My Note",
				expected: "[My Note](folder/note.md)",
			},
			{
				description: "特殊文字を含むalias（相対パス使用）",
				targetPath: "folder/note.md",
				fromPath: "current.md",
				alias: "Note: Important!",
				expected: "[Note: Important!](folder/note.md)",
			},
			{
				description: "親ディレクトリへのalias付きリンク",
				targetPath: "note.md",
				fromPath: "folder/current.md",
				alias: "Parent Note",
				expected: "[Parent Note](../note.md)",
			},
		])("$description", ({ targetPath, fromPath, alias, expected }) => {
			expect(generateMarkdownLink(targetPath, fromPath, alias)).toBe(expected);
		});
	});

	describe("Alias未入力時は[filename](path.md)形式になる (AC2)", () => {
		test.each([
			{
				description: "拡張子なしのファイル名をリンクテキストに使用（相対パス使用）",
				targetPath: "folder/my-note.md",
				fromPath: "current.md",
				expected: "[my-note](folder/my-note.md)",
			},
			{
				description: "ハイフン区切りのファイル名（相対パス使用）",
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
			{
				description: "兄弟ディレクトリのファイル",
				targetPath: "folder2/note.md",
				fromPath: "folder1/current.md",
				expected: "[note](../folder2/note.md)",
			},
		])("$description", ({ targetPath, fromPath, expected }) => {
			expect(generateMarkdownLink(targetPath, fromPath)).toBe(expected);
		});
	});
});

describe("calculateRelativePath", () => {
	describe("相対パスが正しく計算される (AC3)", () => {
		test.each([
			{
				description: "同じディレクトリ内のファイル",
				fromPath: "folder/current.md",
				toPath: "folder/target.md",
				expected: "target.md",
			},
			{
				description: "サブディレクトリ内のファイル",
				fromPath: "current.md",
				toPath: "subfolder/target.md",
				expected: "subfolder/target.md",
			},
			{
				description: "親ディレクトリのファイル",
				fromPath: "folder/current.md",
				toPath: "target.md",
				expected: "../target.md",
			},
			{
				description: "兄弟ディレクトリのファイル",
				fromPath: "folder1/current.md",
				toPath: "folder2/target.md",
				expected: "../folder2/target.md",
			},
			{
				description: "深い階層のサブディレクトリ",
				fromPath: "current.md",
				toPath: "folder1/folder2/target.md",
				expected: "folder1/folder2/target.md",
			},
			{
				description: "2階層上のファイル",
				fromPath: "folder1/folder2/current.md",
				toPath: "target.md",
				expected: "../../target.md",
			},
			{
				description: "異なる深さの兄弟ディレクトリ",
				fromPath: "folder1/folder2/current.md",
				toPath: "folder3/target.md",
				expected: "../../folder3/target.md",
			},
		])("$description", ({ fromPath, toPath, expected }) => {
			expect(calculateRelativePath(fromPath, toPath)).toBe(expected);
		});
	});
});
