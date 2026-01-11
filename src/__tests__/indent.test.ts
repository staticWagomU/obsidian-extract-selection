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
