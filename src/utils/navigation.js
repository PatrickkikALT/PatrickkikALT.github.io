export function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = path.includes('#') ? path.slice(path.indexOf('#')) : '';
  if (hash) {
    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
