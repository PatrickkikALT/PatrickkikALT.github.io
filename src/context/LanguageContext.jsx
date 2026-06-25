import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLanguage, storageKey, translate } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(storageKey) || defaultLanguage);

  const setLang = useCallback((nextLang) => {
    setLangState(nextLang);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key, replacements) => translate(lang, key, replacements), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
