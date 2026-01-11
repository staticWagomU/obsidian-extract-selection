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

	describe("duplicate -1 suffix", () => {
		it.each([
			{
				baseName: "document",
				existingFiles: ["document"],
				expected: "document-1",
				description: "single duplicate",
			},
			{
				baseName: "note",
				existingFiles: ["note", "other"],
				expected: "note-1",
				description: "duplicate among other files",
			},
			{
				baseName: "file",
				existingFiles: ["file", "file-2"],
				expected: "file-1",
				description: "duplicate with non-sequential existing suffix",
			},
		])(
			"should append -1 when $description",
			({ baseName, existingFiles, expected }) => {
				const result = getUniqueFilename(baseName, existingFiles);
				expect(result).toBe(expected);
			},
		);
	});
});
