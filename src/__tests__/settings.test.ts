import { describe, it, expect } from "vitest";
import { DEFAULT_SETTINGS, type ExtractSelectionSettings } from "../types";

describe("ExtractSelectionSettings", () => {
	describe("templateFolder", () => {
		it("should have default value 'Templates'", () => {
			expect(DEFAULT_SETTINGS.templateFolder).toBe("Templates");
		});

		it("should allow custom templateFolder value", () => {
			const customSettings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				templateFolder: "MyTemplates",
			};
			expect(customSettings.templateFolder).toBe("MyTemplates");
		});

		it("should preserve templateFolder value when serialized", () => {
			const settings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				templateFolder: "CustomFolder",
			};
			const serialized = JSON.stringify(settings);
			const deserialized = JSON.parse(serialized) as ExtractSelectionSettings;
			expect(deserialized.templateFolder).toBe("CustomFolder");
		});
	});

	describe("outputFolder", () => {
		it("should have default value ''", () => {
			expect(DEFAULT_SETTINGS.outputFolder).toBe("");
		});

		it("should allow custom outputFolder value", () => {
			const customSettings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				outputFolder: "Output",
			};
			expect(customSettings.outputFolder).toBe("Output");
		});

		it("should preserve outputFolder value when serialized", () => {
			const settings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				outputFolder: "MyOutput",
			};
			const serialized = JSON.stringify(settings);
			const deserialized = JSON.parse(serialized) as ExtractSelectionSettings;
			expect(deserialized.outputFolder).toBe("MyOutput");
		});
	});

	describe("defaultFilenameFormat", () => {
		it("should have default value 'yyyyMMddHHmmss'", () => {
			expect(DEFAULT_SETTINGS.defaultFilenameFormat).toBe("yyyyMMddHHmmss");
		});

		it("should allow custom defaultFilenameFormat value", () => {
			const customSettings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				defaultFilenameFormat: "yyyy-MM-dd",
			};
			expect(customSettings.defaultFilenameFormat).toBe("yyyy-MM-dd");
		});

		it("should preserve defaultFilenameFormat value when serialized", () => {
			const settings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				defaultFilenameFormat: "yyyy/MM/dd-HHmmss",
			};
			const serialized = JSON.stringify(settings);
			const deserialized = JSON.parse(serialized) as ExtractSelectionSettings;
			expect(deserialized.defaultFilenameFormat).toBe("yyyy/MM/dd-HHmmss");
		});
	});

	describe("addAliasToFrontmatter", () => {
		it("should have default value true", () => {
			expect(DEFAULT_SETTINGS.addAliasToFrontmatter).toBe(true);
		});

		it("should allow custom addAliasToFrontmatter value", () => {
			const customSettings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				addAliasToFrontmatter: false,
			};
			expect(customSettings.addAliasToFrontmatter).toBe(false);
		});

		it("should preserve addAliasToFrontmatter value when serialized", () => {
			const settings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				addAliasToFrontmatter: false,
			};
			const serialized = JSON.stringify(settings);
			const deserialized = JSON.parse(serialized) as ExtractSelectionSettings;
			expect(deserialized.addAliasToFrontmatter).toBe(false);
		});
	});

	describe("removeCommonIndent", () => {
		it("should have default value false", () => {
			expect(DEFAULT_SETTINGS.removeCommonIndent).toBe(false);
		});

		it("should allow custom removeCommonIndent value", () => {
			const customSettings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				removeCommonIndent: true,
			};
			expect(customSettings.removeCommonIndent).toBe(true);
		});

		it("should preserve removeCommonIndent value when serialized", () => {
			const settings: ExtractSelectionSettings = {
				...DEFAULT_SETTINGS,
				removeCommonIndent: true,
			};
			const serialized = JSON.stringify(settings);
			const deserialized = JSON.parse(serialized) as ExtractSelectionSettings;
			expect(deserialized.removeCommonIndent).toBe(true);
		});
	});
});
