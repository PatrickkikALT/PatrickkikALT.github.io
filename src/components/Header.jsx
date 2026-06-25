import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { socials } from '../data/socials';
import { SmartLink } from './SmartLink';

export function Header({ currentPath }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Resume', href: '/resume' },
  ];
  const activeHref = currentPath.includes('#projects') ? '/#projects' : currentPath.split('?')[0];

  return (
    <header className="site-header">
      <SmartLink href="/" className="brand" ariaLabel="Go to home">
        <img src="/assets/avatar.png" alt="" />
        <span>Patrick Kikkert</span>
      </SmartLink>

      <button className="icon-button nav-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {links.map((link) => (
          <SmartLink key={link.href} href={link.href} className={activeHref === link.href ? 'active' : ''}>
            {link.label}
          </SmartLink>
        ))}
      </nav>

      <div className="social-strip">
        {socials.map((social) => (
          <a key={social.label} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={social.label}>
            <img src={social.icon} alt="" />
          </a>
        ))}
      </div>
    </header>
  );
}
