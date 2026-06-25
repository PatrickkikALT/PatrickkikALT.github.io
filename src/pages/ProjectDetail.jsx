import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Github,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { SmartLink } from '../components/SmartLink';

export function ProjectDetail({ projects, id }) {
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
        <SmartLink href="/" className="back-link"><ArrowLeft size={17} /> Back to home</SmartLink>
        <h1>Project not found</h1>
        <p>The project could not be loaded from the portfolio data.</p>
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
      <SmartLink href="/" className="back-link"><ArrowLeft size={17} /> Back to home</SmartLink>
      <div className="detail-header">
        <div className="detail-copy">
          <div className="detail-title-row">
            <h1>{project.title}</h1>
            {hasGithub && (
              <a className="github-title-link" href={project.githublink} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}>
                <Github size={22} />
              </a>
            )}
          </div>
          <p>{project.description}</p>
          <div className="meta-row">
            {project.languages?.map((language) => <span key={language}>{language}</span>)}
          </div>
          {project.features?.length > 0 && (
            <div className="feature-list compact">
              <h2>Features</h2>
              <div>
                {project.features.map((feature) => <span key={feature}>{feature}</span>)}
              </div>
            </div>
          )}
          {project.information?.length > 0 && (
            <div className="article-flow">
              {project.information.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
        </div>
        {activeImage && (
          <div className="project-gallery">
            <div className="gallery-stage">
              {showGalleryControls && (
                <button type="button" className="gallery-control previous" onClick={() => changeImage(-1)} aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>
              )}
              <button type="button" className="gallery-zoom-trigger" onClick={openLightbox} aria-label="Zoom image">
                <img src={`/${activeImage}`} alt={`${project.title} screenshot ${selectedImage + 1}`} />
                <span><ZoomIn size={18} /> Zoom</span>
              </button>
              {showGalleryControls && (
                <button type="button" className="gallery-control next" onClick={() => changeImage(1)} aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
              )}
            </div>
            {showGalleryControls && (
              <div className="gallery-strip" aria-label={`${project.title} image gallery`}>
                {galleryImages.map((src, index) => (
                  <button
                    type="button"
                    key={src}
                    className={index === selectedImage ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Show image ${index + 1}`}
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

      {lightboxOpen && activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image preview`}>
          <div className="lightbox-toolbar">
            {showGalleryControls && <span className="lightbox-count">{selectedImage + 1} / {galleryImages.length}</span>}
            <button type="button" onClick={() => setImageZoom((zoom) => Math.max(1, zoom - 0.25))} aria-label="Zoom out">
              <ZoomOut size={19} />
            </button>
            <span>{Math.round(imageZoom * 100)}%</span>
            <button type="button" onClick={() => setImageZoom((zoom) => Math.min(3, zoom + 0.25))} aria-label="Zoom in">
              <ZoomIn size={19} />
            </button>
            <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Close image preview">
              <X size={20} />
            </button>
          </div>
          <div className="lightbox-stage" onClick={() => setLightboxOpen(false)}>
            {showGalleryControls && (
              <button type="button" className="lightbox-control previous" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} aria-label="Previous image">
                <ChevronLeft size={28} />
              </button>
            )}
            <img
              src={`/${activeImage}`}
              alt={`${project.title} enlarged screenshot ${selectedImage + 1}`}
              style={{ transform: `scale(${imageZoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
            {showGalleryControls && (
              <button type="button" className="lightbox-control next" onClick={(event) => { event.stopPropagation(); changeImage(1); }} aria-label="Next image">
                <ChevronRight size={28} />
              </button>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
