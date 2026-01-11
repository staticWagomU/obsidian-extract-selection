/**
 * 日付フォーマットに基づいてファイル名を生成する
 * @param date - ファイル名生成に使用する日付
 * @param format - ファイル名のフォーマット（デフォルト: "yyyyMMddHHmmss"）
 * @returns 生成されたファイル名
 */
export function generateFilename(
	date: Date,
	format = "yyyyMMddHHmmss"
): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return format
		.replace("yyyy", String(year))
		.replace("MM", month)
		.replace("dd", day)
		.replace("HH", hours)
		.replace("mm", minutes)
		.replace("ss", seconds);
}
