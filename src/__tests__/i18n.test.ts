import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock obsidian module
vi.mock("obsidian", () => ({
	moment: {
		locale: vi.fn(() => "en"),
	},
}));

import { getLocale, t } from "../i18n";
import { moment } from "obsidian";

describe("i18n", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getLocale", () => {
		it("should return 'en' when moment locale is 'en'", () => {
			vi.mocked(moment.locale).mockReturnValue("en");
			expect(getLocale()).toBe("en");
		});

		it("should return 'ja' when moment locale is 'ja'", () => {
			vi.mocked(moment.locale).mockReturnValue("ja");
			expect(getLocale()).toBe("ja");
		});

		it("should fallback to 'en' for unsupported locales", () => {
			vi.mocked(moment.locale).mockReturnValue("fr");
			expect(getLocale()).toBe("en");
		});
	});

	describe("t", () => {
		it("should return English translation for 'en' locale", () => {
			vi.mocked(moment.locale).mockReturnValue("en");
			expect(t("pluginName")).toBe("Extract Selection");
		});

		it("should return Japanese translation for 'ja' locale", () => {
			vi.mocked(moment.locale).mockReturnValue("ja");
			expect(t("pluginName")).toBe("選択範囲を抽出");
		});

		it("should fallback to English for unsupported locales", () => {
			vi.mocked(moment.locale).mockReturnValue("de");
			expect(t("pluginName")).toBe("Extract Selection");
		});

		it("should replace placeholders with params", () => {
			vi.mocked(moment.locale).mockReturnValue("en");
			expect(t("msgNoteCreated", { filename: "test.md" })).toBe(
				"Note created: test.md",
			);
		});

		it("should replace placeholders in Japanese", () => {
			vi.mocked(moment.locale).mockReturnValue("ja");
			expect(t("msgNoteCreated", { filename: "test.md" })).toBe(
				"ノートを作成しました: test.md",
			);
		});
	});
});
