import { useMemo } from 'react';
import { categoryOrder } from '../data/categories';
import { quickLinks } from '../data/quickLinks';
import { useLanguage } from '../context/LanguageContext';
import { getBalancedColumns, getCategory } from '../utils/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SmartLink } from '../components/SmartLink';

export function Home({ projects }) {
  const { t } = useLanguage();
  const validProjects = projects.filter((project) => project.id);
  console.log("What were you hoping to find here?")
  console.log("'I was attacked, obviously. By vast quantities of alcohol, wielded by my own treacherous hand' - Lorath from Diablo IV")
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
              <h1>{t('common.name')}</h1>
            </div>
            <p className="hero-text">{t('home.heroText')}</p>
            <div className="hero-actions">
              <SmartLink href="#projects" className="button primary">{t('home.viewProjects')}</SmartLink>
              <SmartLink href="/resume" className="button secondary">{t('nav.resume')}</SmartLink>
            </div>
          </div>
          <img className="hero-avatar" src="/assets/avatar.png" alt={t('common.name')} />
        </div>
      </section>

      <section className="intro-panel">
        <div>
          <h2>{t('home.hiThere')}</h2>
          <p>
            {t('home.introP1BeforeGithub')}
            <a href="https://github.com/PatrickkikALT" target="_blank" rel="noreferrer">GitHub</a>
            {t('home.introP1AfterGithub')}
          </p>
          <p>
            {t('home.introP2BeforeDiscord')}
            {t('home.introP2BetweenDiscordAndEmail')}
            <a href="mailto:pa.kikkert@gmail.com">pa.kikkert@gmail.com</a>
            {t('home.introP2AfterEmail')}
          </p>
        </div>
        <div className="quick-links">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <SmartLink key={item.labelKey} href={item.href} local={item.local} className="quick-link">
                <Icon size={18} />
                <span>{t(item.labelKey)}</span>
              </SmartLink>
            );
          })}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <h2>{t('home.projectsHeading')}</h2>
        </div>
        {categoryOrder.map((category) => (
          <div className="project-group" key={category.key}>
            <div className="project-group-heading">
              <h3>{t(`categories.${category.key}.title`)}</h3>
              <p>{t(`categories.${category.key}.description`)}</p>
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
