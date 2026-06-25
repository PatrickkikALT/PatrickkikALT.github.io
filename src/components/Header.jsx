import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { socials } from '../data/socials';
import { LanguageToggle } from './LanguageToggle';
import { SmartLink } from './SmartLink';

export function Header({ currentPath }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const links = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.projects', href: '/#projects' },
    { labelKey: 'nav.resume', href: '/resume' },
  ];
  const activeHref = currentPath.includes('#projects') ? '/#projects' : currentPath.split('?')[0];

  return (
    <header className="site-header">
      <SmartLink href="/" className="brand" ariaLabel={t('nav.goToHome')}>
        <img src="/assets/avatar.png" alt="" />
        <span>{t('common.name')}</span>
      </SmartLink>

      <button
        className="icon-button nav-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t('nav.toggleNavigation')}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label={t('nav.mainNavigation')}>
        {links.map((link) => (
          <SmartLink key={link.href} href={link.href} className={activeHref === link.href ? 'active' : ''}>
            {t(link.labelKey)}
          </SmartLink>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageToggle />
        <div className="social-strip">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={social.label}
            >
              <img src={social.icon} alt="" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
