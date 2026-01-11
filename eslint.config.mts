import tseslint from 'typescript-eslint';
import obsidianmd from "eslint-plugin-obsidianmd";
import { globalIgnores } from "eslint/config";

// eslint-plugin-obsidianmd のみを有効化
// 一般的なルール（no-unused-vars等）は Oxlint で実行
export default tseslint.config(
	{
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						'eslint.config.mts',
						'manifest.json',
						'vitest.config.ts',
						'scrum.ts'
					]
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.json']
			},
		},
	},
	...obsidianmd.configs.recommended,
	{
		// Oxlint に任せるルールを無効化（obsidianmd.configs.recommended の後に適用）
		// TODO: サンプルコードのリネーム後に sample-names と no-sample-code を有効化
		rules: {
			"no-undef": "off",
			"no-console": "off",
			"obsidianmd/sample-names": "off",
			"obsidianmd/no-sample-code": "off",
		},
	},
	globalIgnores([
		"node_modules",
		"dist",
		"vite.config.ts",
		"version-bump.mjs",
		"versions.json",
		"main.js",
		"src/__tests__/**",
	]),
);
