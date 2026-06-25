import { useMemo } from 'react';
import { categoryOrder } from '../data/categories';
import { quickLinks } from '../data/quickLinks';
import { getBalancedColumns, getCategory } from '../utils/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SmartLink } from '../components/SmartLink';

export function Home({ projects }) {
  const validProjects = projects.filter((project) => project.id && project.title);
  const grouped = useMemo(() => {
    return categoryOrder.reduce((acc, category) => {
      acc[category.key] = validProjects.filter((project) => getCategory(project) === category.key);
      return acc;
    }, {});
  }, [validProjects]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-content">
            <div className="hero-title-row">
              <h1>Patrick Kikkert</h1>
            </div>
            <p className="hero-text">
              I'm a passionate programmer specializing in C# and Unity Development. This site showcases my projects, skills, and experience.
            </p>
            <div className="hero-actions">
              <SmartLink href="#projects" className="button primary">View projects</SmartLink>
              <SmartLink href="/resume" className="button secondary">Resume</SmartLink>
            </div>
          </div>
          <img className="hero-avatar" src="/assets/avatar.png" alt="Patrick Kikkert" />
        </div>
      </section>

      <section className="intro-panel">
        <div>
          <h2>Hi there!</h2>
          <p>
            My name is Patrick Kikkert. This website serves as a hub for things I want to put out there and
            projects I am proud of. You can find all of my projects over on my{' '}
            <a href="https://github.com/PatrickkikALT" target="_blank" rel="noreferrer">GitHub</a>.
          </p>
          <p>
            For non-work related contact, the fastest way is through my{' '}
            <a href="https://discordapp.com/users/432556223527911434" target="_blank" rel="noreferrer">Discord</a>.
            For work related purposes, email me at <a href="mailto:pa.kikkert@gmail.com">pa.kikkert@gmail.com</a>.
          </p>
        </div>
        <div className="quick-links">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <SmartLink key={item.label} href={item.href} local={item.local} className="quick-link">
                <Icon size={18} />
                <span>{item.label}</span>
              </SmartLink>
            );
          })}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <h2>Projects</h2>
        </div>
        {categoryOrder.map((category) => (
          <div className="project-group" key={category.key}>
            <div className="project-group-heading">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            <div
              className="project-grid"
              style={{ '--project-columns': getBalancedColumns(grouped[category.key]?.length ?? 0) }}
            >
              {grouped[category.key]?.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
