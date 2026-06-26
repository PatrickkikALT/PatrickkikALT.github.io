import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { FlipjeEasterEgg } from './components/FlipjeEasterEgg';
import { KonamiSnake } from './components/KonamiSnake';
import { useLanguage } from './context/LanguageContext';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';
import { localizeProjects } from './utils/projects';

export function App() {
  const { t, lang } = useLanguage();
  const [path, setPath] = useState(window.location.pathname + window.location.search + window.location.hash);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const localizedProjects = useMemo(() => localizeProjects(projects, lang), [projects, lang]);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname + window.location.search + window.location.hash);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Could not load projects')))
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const title = path.startsWith('/resume') ? t('meta.resumeTitle') : t('meta.portfolioTitle');
    document.title = title;
  }, [path, t]);

  useEffect(() => {
    console.log("'I was attacked, obviously. By vast quantities of alcohol, wielded by my own treacherous hand' - Lorath from Diablo IV")
  }, []);
  const url = new URL(window.location.href);
  const legacyProjectId = url.searchParams.get('id');
  const projectMatch = url.pathname.match(/^\/projects\/?([^/]*)/);
  const projectId = projectMatch?.[1] || legacyProjectId;

  let page = <Home projects={localizedProjects} />;
  if (loading) page = <main className="loading">{t('common.loading')}</main>;
  else if (url.pathname.startsWith('/resume')) page = <Resume />;
  else if (url.pathname.startsWith('/projects') && projectId) page = <ProjectDetail projects={localizedProjects} id={projectId} />;

  return (
    <div>
      <FlipjeEasterEgg />
      <KonamiSnake />
      <Header currentPath={`${url.pathname}${url.hash}`} />
      <main>{page}</main>
      <footer>
        <span>© 2026 Patrick Kikkert</span>

        <a href="mailto:pa.kikkert@gmail.com">pa.kikkert@gmail.com</a>

      </footer>
    </div>
  );
}
