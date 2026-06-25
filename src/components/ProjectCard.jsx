import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCategory } from '../utils/projects';
import { SmartLink } from './SmartLink';

export function ProjectCard({ project, featured = false }) {
  const { t } = useLanguage();

  return (
    <SmartLink
      href={`/projects/${project.id}`}
      className={featured ? 'project-card featured' : 'project-card'}
      ariaLabel={t('project.viewProject', { title: project.title })}
    >
      {project.thumbnail && (
        <img
          src={`/${project.thumbnail}`}
          alt={t('project.screenshot', { title: project.title })}
          loading="lazy"
        />
      )}
      <div className="project-body">
        <div className="project-card-top">
          <p>{getCategory(project)}</p>
          {project.languages?.length > 0 && <span>{project.languages.join(' / ')}</span>}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <span className="stretched-link">
        <span>{t('project.openProject')}</span>
        <ExternalLink size={16} />
      </span>
    </SmartLink>
  );
}
