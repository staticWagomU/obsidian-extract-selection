import { describe, it, expect } from "vitest";
import { getUniqueFilename } from "../duplicate";

describe("duplicate", () => {
	describe("no duplication", () => {
		it("should return original filename when no duplicates exist", () => {
			const baseName = "newfile";
			const existingFiles = ["otherfile", "anotherfile"];
			const result = getUniqueFilename(baseName, existingFiles);
			expect(result).toBe("newfile");
		});

		it("should return original filename when existingFiles is empty", () => {
			const baseName = "newfile";
			const existingFiles: string[] = [];
			const result = getUniqueFilename(baseName, existingFiles);
			expect(result).toBe("newfile");
		});
	});

	describe("duplicate detection", () => {
		it("should detect duplicate filename", () => {
			const baseName = "existingfile";
			const existingFiles = ["existingfile", "otherfile"];
			const result = getUniqueFilename(baseName, existingFiles);
			expect(result).not.toBe("existingfile");
		});
	});
});
