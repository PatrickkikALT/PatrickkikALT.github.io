import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Github,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { CodeSnippet } from '../components/CodeSnippet';
import { SmartLink } from '../components/SmartLink';
import { useLanguage } from '../context/LanguageContext';

function ArticleParagraph({ text }) {
  const parts = text.split(/(`[^`\n]+`)/g);

  return (
    <p>
      {parts.map((part, index) => (
        part.startsWith('`') && part.endsWith('`')
          ? <code key={index}>{part.slice(1, -1)}</code>
          : part
      ))}
    </p>
  );
}

export function ProjectDetail({ projects, id }) {
  const { t } = useLanguage();
  const project = projects.find((item) => item.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const galleryImages = useMemo(() => {
    if (!project) return [];
    return [...new Set([project.thumbnail, ...(project.images ?? [])].filter(Boolean))];
  }, [project]);

  useEffect(() => {
    setSelectedImage(0);
    setLightboxOpen(false);
    setImageZoom(1);
  }, [id]);

  const activeImage = galleryImages[selectedImage];
  const showGalleryControls = galleryImages.length > 1;
  const changeImage = useCallback((direction) => {
    if (!galleryImages.length) return;
    setSelectedImage((current) => (current + direction + galleryImages.length) % galleryImages.length);
    setImageZoom(1);
  }, [galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      } else if (event.key === 'ArrowLeft' && showGalleryControls) {
        event.preventDefault();
        changeImage(-1);
      } else if (event.key === 'ArrowRight' && showGalleryControls) {
        event.preventDefault();
        changeImage(1);
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setImageZoom((zoom) => Math.min(3, zoom + 0.25));
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        setImageZoom((zoom) => Math.max(1, zoom - 0.25));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeImage, lightboxOpen, showGalleryControls]);

  if (!project) {
    return (
      <section className="detail-shell">
        <SmartLink href="/" className="back-link"><ArrowLeft size={17} /> {t('project.backToHome')}</SmartLink>
        <h1>{t('project.notFound')}</h1>
        <p>{t('project.notFoundDescription')}</p>
      </section>
    );
  }

  const hasGithub = project.githublink && project.githublink !== 'N/A';
  const openLightbox = () => {
    setImageZoom(1);
    setLightboxOpen(true);
  };

  return (
    <section className="detail-shell">
      <SmartLink href="/" className="back-link"><ArrowLeft size={17} /> {t('project.backToHome')}</SmartLink>
      <div className="detail-header">
        <div className="detail-copy">
          <div className="detail-title-row">
            <h1>{project.title}</h1>
            {hasGithub && (
              <a className="github-title-link" href={project.githublink} target="_blank" rel="noreferrer" aria-label={t('project.onGithub', { title: project.title })}>
                <Github size={22} />
              </a>
            )}
          </div>
          <p>{project.description}</p>
          <div className="meta-row">
            {project.year && (
              <span className="meta-year" aria-label={t('project.createdIn', { year: project.year })}>
                <Calendar size={14} aria-hidden="true" />
                {project.year}
              </span>
            )}
            {project.languages?.map((language) => <span key={language}>{language}</span>)}
          </div>
          {project.features?.length > 0 && (
            <div className="feature-list compact">
              <h2>{t('project.features')}</h2>
              <div>
                {project.features.map((feature) => <span key={feature}>{feature}</span>)}
              </div>
            </div>
          )}
          {project.information?.length > 0 && (
            <div className="article-flow">
              {project.information.map((paragraph) => <ArticleParagraph key={paragraph} text={paragraph} />)}
            </div>
          )}
        </div>
        {activeImage && (
          <div className="project-gallery">
            <div className="gallery-stage">
              {showGalleryControls && (
                <button type="button" className="gallery-control previous" onClick={() => changeImage(-1)} aria-label={t('project.previousImage')}>
                  <ChevronLeft size={22} />
                </button>
              )}
              <button type="button" className="gallery-zoom-trigger" onClick={openLightbox} aria-label={t('project.zoomImage')}>
                <img src={`/${activeImage}`} alt={t('project.screenshotNumber', { title: project.title, number: selectedImage + 1 })} />
                <span><ZoomIn size={18} /> {t('project.zoom')}</span>
              </button>
              {showGalleryControls && (
                <button type="button" className="gallery-control next" onClick={() => changeImage(1)} aria-label={t('project.nextImage')}>
                  <ChevronRight size={22} />
                </button>
              )}
            </div>
            {showGalleryControls && (
              <div className="gallery-strip" aria-label={t('project.imageGallery', { title: project.title })}>
                {galleryImages.map((src, index) => (
                  <button
                    type="button"
                    key={src}
                    className={index === selectedImage ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                    aria-label={t('project.showImage', { number: index + 1 })}
                    aria-pressed={index === selectedImage}
                  >
                    <img src={`/${src}`} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {project.snippets?.length > 0 && (
        <div className="snippet-section">
          <h2>{t('project.code')}</h2>
          {project.snippets.map((snippet, index) => (
            <CodeSnippet key={`${snippet.filename}-${snippet.title}-${index}`} snippet={snippet} />
          ))}
        </div>
      )}

      {lightboxOpen && activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t('project.imagePreview', { title: project.title })}>
          <div className="lightbox-toolbar">
            {showGalleryControls && <span className="lightbox-count">{selectedImage + 1} / {galleryImages.length}</span>}
            <button type="button" onClick={() => setImageZoom((zoom) => Math.max(1, zoom - 0.25))} aria-label={t('project.zoomOut')}>
              <ZoomOut size={19} />
            </button>
            <span>{Math.round(imageZoom * 100)}%</span>
            <button type="button" onClick={() => setImageZoom((zoom) => Math.min(3, zoom + 0.25))} aria-label={t('project.zoomIn')}>
              <ZoomIn size={19} />
            </button>
            <button type="button" onClick={() => setLightboxOpen(false)} aria-label={t('project.closePreview')}>
              <X size={20} />
            </button>
          </div>
          <div className="lightbox-stage" onClick={() => setLightboxOpen(false)}>
            {showGalleryControls && (
              <button type="button" className="lightbox-control previous" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} aria-label={t('project.previousImage')}>
                <ChevronLeft size={28} />
              </button>
            )}
            <img
              src={`/${activeImage}`}
              alt={t('project.enlargedScreenshot', { title: project.title, number: selectedImage + 1 })}
              style={{ transform: `scale(${imageZoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
            {showGalleryControls && (
              <button type="button" className="lightbox-control next" onClick={(event) => { event.stopPropagation(); changeImage(1); }} aria-label={t('project.nextImage')}>
                <ChevronRight size={28} />
              </button>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
