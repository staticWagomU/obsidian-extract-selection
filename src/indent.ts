/**
 * テキストから共通するインデント（先頭の空白文字）を削除する
 *
 * @param text - 処理対象のテキスト
 * @returns 共通インデントが削除されたテキスト
 *
 * @remarks
 * - 空行（長さ0または空白文字のみの行）は最小インデント計算時に無視される
 * - すべての行が空行の場合、元のテキストをそのまま返す
 * - スペースとタブの両方を処理できる
 */
export function removeCommonIndent(text: string): string {
	// 空文字列の場合はそのまま返す
	if (text === "") {
		return text;
	}

	const lines = text.split("\n");

	// 空行ではない行のみを対象に最小インデントを計算
	const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

	// すべての行が空行の場合は元のテキストを返す
	if (nonEmptyLines.length === 0) {
		return text;
	}

	// 各行の先頭のインデント量を計算
	const indents = nonEmptyLines.map((line) => {
		const match = line.match(/^[ \t]*/);
		return match ? match[0].length : 0;
	});

	// 最小のインデント量を取得
	const minIndent = Math.min(...indents);

	// 最小インデントが0の場合は何もしない
	if (minIndent === 0) {
		return text;
	}

	// 各行から最小インデント分を削除
	const result = lines
		.map((line) => {
			// 空行の場合はそのまま
			if (line.trim().length === 0) {
				return line;
			}
			// 最小インデント分を削除
			return line.substring(minIndent);
		})
		.join("\n");

	return result;
}
