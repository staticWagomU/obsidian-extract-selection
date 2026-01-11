import { describe, expect, test } from "vitest";
import { removeCommonIndent } from "../indent";

describe("removeCommonIndent", () => {
	describe("共通する先頭スペースを削除 (AC1)", () => {
		test.each([
			{
				description: "2スペースの共通インデント",
				input: "  line1\n  line2\n  line3",
				expected: "line1\nline2\nline3",
			},
			{
				description: "4スペースの共通インデント",
				input: "    line1\n    line2",
				expected: "line1\nline2",
			},
			{
				description: "異なるインデントレベル（最小を削除）",
				input: "  line1\n    line2\n  line3",
				expected: "line1\n  line2\nline3",
			},
		])("$description", ({ input, expected }) => {
			expect(removeCommonIndent(input)).toBe(expected);
		});
	});

	describe("共通する先頭タブを削除 (AC2)", () => {
		test.each([
			{
				description: "1タブの共通インデント",
				input: "\tline1\n\tline2\n\tline3",
				expected: "line1\nline2\nline3",
			},
			{
				description: "2タブの共通インデント",
				input: "\t\tline1\n\t\tline2",
				expected: "line1\nline2",
			},
			{
				description: "異なるタブレベル（最小を削除）",
				input: "\tline1\n\t\tline2\n\tline3",
				expected: "line1\n\tline2\nline3",
			},
		])("$description", ({ input, expected }) => {
			expect(removeCommonIndent(input)).toBe(expected);
		});
	});

	describe("空行を無視して最小インデント計算 (AC3)", () => {
		test.each([
			{
				description: "空行を含む場合（空行は無視）",
				input: "  line1\n\n  line2",
				expected: "line1\n\nline2",
			},
			{
				description: "空白文字のみの行を含む場合",
				input: "  line1\n   \n  line2",
				expected: "line1\n   \nline2",
			},
			{
				description: "先頭と末尾に空行",
				input: "\n  line1\n  line2\n",
				expected: "\nline1\nline2\n",
			},
		])("$description", ({ input, expected }) => {
			expect(removeCommonIndent(input)).toBe(expected);
		});
	});

	describe("エッジケース", () => {
		test.each([
			{
				description: "空文字列",
				input: "",
				expected: "",
			},
			{
				description: "1行のみ",
				input: "  single line",
				expected: "single line",
			},
			{
				description: "すべての行が空行",
				input: "\n\n\n",
				expected: "\n\n\n",
			},
		])("$description", ({ input, expected }) => {
			expect(removeCommonIndent(input)).toBe(expected);
		});
	});
});
