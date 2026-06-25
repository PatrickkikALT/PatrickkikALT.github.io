import { ExternalLink } from 'lucide-react';
import { getCategory } from '../utils/projects';
import { SmartLink } from './SmartLink';

export function ProjectCard({ project, featured = false }) {
  return (
    <SmartLink href={`/projects/${project.id}`} className={featured ? 'project-card featured' : 'project-card'} ariaLabel={`View ${project.title}`}>
      {project.thumbnail && <img src={`/${project.thumbnail}`} alt={`${project.title} screenshot`} loading="lazy" />}
      <div className="project-body">
        <div className="project-card-top">
          <p>{getCategory(project)}</p>
          {project.languages?.length > 0 && <span>{project.languages.join(' / ')}</span>}
        </div>
        <h3>{project.title}</h3>
          <p>{project.description}</p>
      </div>
      <span className="stretched-link">
        <span>Open project</span>
        <ExternalLink size={16} />
      </span>
    </SmartLink>
  );
}
