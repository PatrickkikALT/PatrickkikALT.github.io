import { navigateTo } from '../utils/navigation';

export function SmartLink({ href, local, children, className, ariaLabel }) {
  const isLocal = local || href.startsWith('/') || href.startsWith('#');
  if (!isLocal) {
    return (
      <a className={className} href={href} target={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'} rel="noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <a
      className={className}
      href={href}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        navigateTo(href.startsWith('#') ? `${window.location.pathname}${href}` : href);
      }}
    >
      {children}
    </a>
  );
}
