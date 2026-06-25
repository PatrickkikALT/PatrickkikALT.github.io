import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle({ className = 'language-switch', labelKey = 'nav.languageToggle' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={className} aria-label={t(labelKey)}>
      <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
        EN
      </button>
      <button type="button" className={lang === 'nl' ? 'active' : ''} onClick={() => setLang('nl')}>
        NL
      </button>
    </div>
  );
}
