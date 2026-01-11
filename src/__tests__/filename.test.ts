import { describe, it, expect } from "vitest";
import { generateFilename } from "../filename";

describe("filename", () => {
	describe("yyyyMMddHHmmss format", () => {
		it.each([
			{
				date: new Date(2024, 0, 1, 9, 5, 3),
				expected: "20240101090503",
			},
			{
				date: new Date(2024, 11, 31, 23, 59, 59),
				expected: "20241231235959",
			},
			{
				date: new Date(2024, 5, 15, 0, 0, 0),
				expected: "20240615000000",
			},
		])(
			"should generate filename in yyyyMMddHHmmss format for $expected",
			({ date, expected }) => {
				const result = generateFilename(date);
				expect(result).toBe(expected);
			}
		);
	});
});
