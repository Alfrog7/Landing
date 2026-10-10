export type LangCode = 'es' | 'en' | 'fr' | 'it';

export interface LanguageMeta {
  code: LangCode;
  name: string;
  shortCode: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'es', name: 'Español', shortCode: 'ES', locale: 'es-PE' },
  { code: 'en', name: 'English', shortCode: 'EN', locale: 'en-US' },
  { code: 'fr', name: 'Français', shortCode: 'FR', locale: 'fr-FR' },
  { code: 'it', name: 'Italiano', shortCode: 'IT', locale: 'it-IT' },
];

export const DEFAULT_LANG: LangCode = 'es';
export const LANG_STORAGE_KEY = 'melanie-lang';
