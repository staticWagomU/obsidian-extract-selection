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
			},
		);
	});

	describe("placeholder validation", () => {
		const testDate = new Date(2024, 0, 5, 9, 7, 3); // 2024-01-05 09:07:03

		it.each([
			{ format: "yyyy", expected: "2024", placeholder: "yyyy" },
			{ format: "MM", expected: "01", placeholder: "MM" },
			{ format: "dd", expected: "05", placeholder: "dd" },
			{ format: "HH", expected: "09", placeholder: "HH" },
			{ format: "mm", expected: "07", placeholder: "mm" },
			{ format: "ss", expected: "03", placeholder: "ss" },
		])(
			"should correctly replace placeholder $placeholder",
			({ format, expected }) => {
				const result = generateFilename(testDate, format);
				expect(result).toBe(expected);
			},
		);

		it.each([
			{ date: new Date(2024, 0, 1, 0, 0, 0), format: "MM", expected: "01" },
			{ date: new Date(2024, 11, 1, 0, 0, 0), format: "MM", expected: "12" },
			{ date: new Date(2024, 0, 1, 0, 0, 0), format: "dd", expected: "01" },
			{ date: new Date(2024, 0, 31, 0, 0, 0), format: "dd", expected: "31" },
			{ date: new Date(2024, 0, 1, 0, 0, 0), format: "HH", expected: "00" },
			{ date: new Date(2024, 0, 1, 23, 0, 0), format: "HH", expected: "23" },
			{ date: new Date(2024, 0, 1, 0, 0, 0), format: "mm", expected: "00" },
			{ date: new Date(2024, 0, 1, 0, 59, 0), format: "mm", expected: "59" },
			{ date: new Date(2024, 0, 1, 0, 0, 0), format: "ss", expected: "00" },
			{ date: new Date(2024, 0, 1, 0, 0, 59), format: "ss", expected: "59" },
		])(
			"should apply zero-padding for $format with value $expected",
			({ date, format, expected }) => {
				const result = generateFilename(date, format);
				expect(result).toBe(expected);
			},
		);
	});
});
