import type { Locale } from './routing';

export type LanguageInfo = {
  code: Locale;
  name: string;
  native: string;
  dir: 'ltr' | 'rtl';
};

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', dir: 'ltr' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文', dir: 'ltr' },
  { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', native: 'Português', dir: 'ltr' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', dir: 'ltr' },
  { code: 'ru', name: 'Russian', native: 'Русский', dir: 'ltr' },
  { code: 'ko', name: 'Korean', native: '한국어', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語', dir: 'ltr' },
  { code: 'th', name: 'Thai', native: 'ไทย', dir: 'ltr' },
  { code: 'tl', name: 'Filipino', native: 'Tagalog', dir: 'ltr' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', dir: 'ltr' },
  { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr' },
  { code: 'fr', name: 'French', native: 'Français', dir: 'ltr' },
  { code: 'pl', name: 'Polish', native: 'Polski', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', native: 'اردو', dir: 'rtl' },
  { code: 'fa', name: 'Persian', native: 'فارسی', dir: 'rtl' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', dir: 'ltr' },
  { code: 'it', name: 'Italian', native: 'Italiano', dir: 'ltr' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', dir: 'ltr' },
  { code: 'ro', name: 'Romanian', native: 'Română', dir: 'ltr' },
  { code: 'cs', name: 'Czech', native: 'Čeština', dir: 'ltr' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', dir: 'ltr' },
  { code: 'he', name: 'Hebrew', native: 'עברית', dir: 'rtl' },
];

export const languageMap = new Map(languages.map(lang => [lang.code, lang]));

export function getLanguageInfo(code: Locale): LanguageInfo {
  return languageMap.get(code) ?? { code, name: code, native: code, dir: 'ltr' };
}

