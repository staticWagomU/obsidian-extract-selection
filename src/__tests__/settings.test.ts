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
});
