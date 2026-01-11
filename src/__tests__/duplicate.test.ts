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
		])("should append -1 when $description", ({ baseName, existingFiles, expected }) => {
			const result = getUniqueFilename(baseName, existingFiles);
			expect(result).toBe(expected);
		});
	});

	describe("duplicate sequential suffix", () => {
		it.each([
			{
				baseName: "document",
				existingFiles: ["document", "document-1"],
				expected: "document-2",
				description: "document and document-1 exist",
			},
			{
				baseName: "note",
				existingFiles: ["note", "note-1", "note-2"],
				expected: "note-3",
				description: "note, note-1, and note-2 exist",
			},
			{
				baseName: "file",
				existingFiles: ["file", "file-1", "file-2", "file-3", "file-4"],
				expected: "file-5",
				description: "file through file-4 exist",
			},
			{
				baseName: "task",
				existingFiles: ["task", "task-1", "task-3"],
				expected: "task-2",
				description: "task and task-1 exist with gap at task-2",
			},
			{
				baseName: "memo",
				existingFiles: ["memo", "memo-2", "memo-3"],
				expected: "memo-1",
				description: "memo exists but memo-1 is missing",
			},
		])("should append sequential number when $description", ({ baseName, existingFiles, expected }) => {
			const result = getUniqueFilename(baseName, existingFiles);
			expect(result).toBe(expected);
		});
	});
});
