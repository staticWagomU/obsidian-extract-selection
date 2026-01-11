import { describe, expect, test, vi } from "vitest";

// Mock obsidian module
vi.mock("obsidian", () => ({
	TFile: class {
		path: string;
		extension: string;

		constructor(path: string) {
			this.path = path;
			this.extension = path.split(".").pop() || "";
		}
	},
	TFolder: class {
		path: string;
		children: any[] = [];

		constructor(path: string) {
			this.path = path;
		}
	},
	Vault: class {
		getAbstractFileByPath(_path: string): any {
			return null;
		}
	},
}));

import { getTemplateFiles } from "../templateFiles";
import { TFile, TFolder, Vault } from "obsidian";

describe("getTemplateFiles", () => {
	describe("指定フォルダ内の.mdファイル一覧が取得できる (AC1)", () => {
		test("basic: フォルダ内の.mdファイルのみを取得", () => {
			// Create test data using mock constructors directly
			const folder: any = Object.create(TFolder.prototype);
			folder.path = "Templates";
			folder.children = [];

			const file1: any = Object.create(TFile.prototype);
			file1.path = "Templates/template1.md";
			file1.extension = "md";

			const file2: any = Object.create(TFile.prototype);
			file2.path = "Templates/template2.md";
			file2.extension = "md";

			const file3: any = Object.create(TFile.prototype);
			file3.path = "Templates/note.txt";
			file3.extension = "txt";

			folder.children.push(file1, file2, file3);

			// Create vault mock
			const vault: any = Object.create(Vault.prototype);
			vault.getAbstractFileByPath = vi.fn().mockReturnValue(folder);

			const result = getTemplateFiles(vault, "Templates");

			expect(result).toHaveLength(2);
			expect(result).toContain("Templates/template1.md");
			expect(result).toContain("Templates/template2.md");
			expect(result).not.toContain("Templates/note.txt");
		});
	});
});
