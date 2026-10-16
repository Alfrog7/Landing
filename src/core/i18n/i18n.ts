import { useEffect, useState } from 'preact/hooks';
import { DEFAULT_LANG, LANG_STORAGE_KEY, SUPPORTED_LANGUAGES, type LangCode, type LanguageMeta } from './languages';
import { ES } from './dictionaries/es';
import { EN } from './dictionaries/en';
import { FR } from './dictionaries/fr';
import { IT } from './dictionaries/it';

type Dictionary = Record<string, unknown>;

const DICTIONARIES: Record<LangCode, Dictionary> = {
  es: ES as Dictionary,
  en: EN as Dictionary,
  fr: FR as Dictionary,
  it: IT as Dictionary,
};

// Estado compartido entre todas las islas de la página. En el servidor (y en el
// primer render del cliente) el idioma es el predeterminado para que el HTML
// hidratado coincida con el prerenderizado; el idioma guardado se aplica justo
// después del montaje.
let currentLang: LangCode = DEFAULT_LANG;
let detected = false;
const listeners = new Set<() => void>();

function lookup(dict: Dictionary, key: string): unknown {
  let cursor: unknown = dict;
  for (const part of key.split('.')) {
    if (cursor && typeof cursor === 'object' && !Array.isArray(cursor)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return cursor;
}

function resolve(lang: LangCode, key: string): unknown {
  return lookup(DICTIONARIES[lang], key) ?? lookup(DICTIONARIES[DEFAULT_LANG], key);
}

function detectInitialLang(): LangCode {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
      return stored as LangCode;
    }
  } catch {
    // Sin acceso a localStorage: usar el idioma del navegador.
  }
  const browser = (navigator.language || 'es').slice(0, 2).toLowerCase();
  const match = SUPPORTED_LANGUAGES.find((l) => l.code === browser);
  return match ? match.code : DEFAULT_LANG;
}

function ensureDetected(): void {
  if (detected) {
    return;
  }
  detected = true;
  currentLang = detectInitialLang();
  document.documentElement.lang = currentLang;
}

export function setLang(code: LangCode): void {
  if (!SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
    return;
  }
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    // Almacenamiento no disponible (navegación privada): solo cambiar en memoria.
  }
  detected = true;
  document.documentElement.lang = code;
  currentLang = code;
  listeners.forEach((notify) => notify());
}

export interface Translator {
  lang: LangCode;
  languages: LanguageMeta[];
  current: LanguageMeta;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
  tOptional: (key: string) => string | undefined;
  list: (key: string) => string[];
}

function createTranslator(lang: LangCode): Translator {
  return {
    lang,
    languages: SUPPORTED_LANGUAGES,
    current: SUPPORTED_LANGUAGES.find((l) => l.code === lang) ?? SUPPORTED_LANGUAGES[0],
    setLang,
    t(key) {
      const value = resolve(lang, key);
      return typeof value === 'string' ? value : key;
    },
    tOptional(key) {
      const value = resolve(lang, key);
      return typeof value === 'string' && value.length > 0 ? value : undefined;
    },
    list(key) {
      const value = resolve(lang, key);
      return Array.isArray(value) ? value : [];
    },
  };
}

export function useTranslation(): Translator {
  const [lang, setLocalLang] = useState<LangCode>(DEFAULT_LANG);

  useEffect(() => {
    ensureDetected();
    const sync = () => setLocalLang(currentLang);
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return createTranslator(lang);
}
