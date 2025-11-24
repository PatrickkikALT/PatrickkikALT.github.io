(function(){
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const KEY = 'theme';

  function applyStored() {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === 'dark') root.classList.add('dark-theme');
      else if (stored === 'light') root.classList.remove('dark-theme');
      else {
        root.classList.add('dark-theme');
      }
    } catch (e) {
    }
    updateButton();
  }

  function updateButton(){
    if (!toggle) return;
    const isDark = root.classList.contains('dark-theme');
    toggle.textContent = isDark ? '☀' : '🌙';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function toggleTheme(){
    const isDark = root.classList.toggle('dark-theme');
    try { localStorage.setItem(KEY, isDark ? 'dark' : 'light'); } catch(e){}
    updateButton();
  }

  applyStored();

  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
    updateButton();
  }
})();
