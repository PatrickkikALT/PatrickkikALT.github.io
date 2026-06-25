import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';

export function App() {
  const [path, setPath] = useState(window.location.pathname + window.location.search + window.location.hash);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const title = path.startsWith('/resume') ? 'Resume - Patrick Kikkert' : 'Portfolio Patrick Kikkert';
    document.title = title;
  }, [path]);

  const url = new URL(window.location.href);
  const legacyProjectId = url.searchParams.get('id');
  const projectMatch = url.pathname.match(/^\/projects\/?([^/]*)/);
  const projectId = projectMatch?.[1] || legacyProjectId;

  let page = <Home projects={projects} />;
  if (loading) page = <main className="loading">Loading portfolio...</main>;
  else if (url.pathname.startsWith('/resume')) page = <Resume />;
  else if (url.pathname.startsWith('/projects') && projectId) page = <ProjectDetail projects={projects} id={projectId} />;

  return (
    <div>
      <Header currentPath={`${url.pathname}${url.hash}`} />
      <main>{page}</main>
      <footer>
        <span>© 2026 Patrick Kikkert</span>

        <a href="mailto:pa.kikkert@gmail.com">pa.kikkert@gmail.com</a>

      </footer>
    </div>
  );
}
