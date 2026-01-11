import { moment } from "obsidian";
import { en, type TranslationKeys } from "./locales/en";
import { ja } from "./locales/ja";

type Translations = Record<TranslationKeys, string>;

const locales: Record<string, Translations> = {
	en,
	ja,
};

/**
 * Get the current locale from Obsidian's moment instance.
 * Falls back to 'en' if the locale is not supported.
 */
export function getLocale(): string {
	const locale = moment.locale();
	return locale in locales ? locale : "en";
}

/**
 * Get a translated string by key.
 * Supports placeholder replacement with {key} syntax.
 *
 * @example
 * t("msgNoteCreated", { filename: "note.md" })
 * // => "Note created: note.md"
 */
export function t(key: TranslationKeys, params?: Record<string, string>): string {
	const locale = getLocale();
	const translations = locales[locale] ?? locales.en!;
	let text = translations[key] ?? en[key];

	if (params) {
		for (const [param, value] of Object.entries(params)) {
			text = text.replace(`{${param}}`, value);
		}
	}

	return text;
}

export { type TranslationKeys };
