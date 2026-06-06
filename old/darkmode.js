// Force dark theme only — no toggle or preference handling
(function(){
  try {
    document.documentElement.classList.add('dark-theme');
  } catch (e) {}
})();
