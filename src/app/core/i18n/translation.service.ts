import { Injectable, signal } from '@angular/core';
import { DEFAULT_LANG, LANG_STORAGE_KEY, SUPPORTED_LANGUAGES, LangCode, LanguageMeta } from './languages';
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

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly languages = SUPPORTED_LANGUAGES;
  readonly lang = signal<LangCode>(this.detectInitialLang());

  setLang(code: LangCode): void {
    if (!SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
      return;
    }
    try {
      localStorage.setItem(LANG_STORAGE_KEY, code);
    } catch {
      // Almacenamiento no disponible (navegación privada): solo cambiar en memoria.
    }
    document.documentElement.lang = code;
    this.lang.set(code);
  }

  get current(): LanguageMeta {
    return SUPPORTED_LANGUAGES.find((l) => l.code === this.lang()) ?? SUPPORTED_LANGUAGES[0];
  }

  t(key: string): string {
    const value = this.lookup(DICTIONARIES[this.lang()], key) ?? this.lookup(DICTIONARIES[DEFAULT_LANG], key);
    return typeof value === 'string' ? value : key;
  }

  tOptional(key: string): string | undefined {
    const value = this.lookup(DICTIONARIES[this.lang()], key) ?? this.lookup(DICTIONARIES[DEFAULT_LANG], key);
    return typeof value === 'string' && value.length > 0 ? value : undefined;
  }

  list(key: string): string[] {
    const value = this.lookup(DICTIONARIES[this.lang()], key) ?? this.lookup(DICTIONARIES[DEFAULT_LANG], key);
    return Array.isArray(value) ? value : [];
  }

  private lookup(dict: Dictionary, key: string): unknown {
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

  private detectInitialLang(): LangCode {
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
}
