/**
 * 既存ファイル名との重複を避けてユニークなファイル名を生成する
 * @param baseName - ベースとなるファイル名
 * @param existingFiles - 既存ファイル名のリスト
 * @returns ユニークなファイル名
 */
export function getUniqueFilename(baseName: string, existingFiles: string[]): string {
	// ベース名が既存ファイルに含まれていない場合はそのまま返す
	if (!existingFiles.includes(baseName)) {
		return baseName;
	}

	// 重複している場合は-1を付与
	return `${baseName}-1`;
}
