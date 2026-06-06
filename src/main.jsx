import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  UserRound,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import './styles.css';

const socials = [
  { label: 'GitHub', href: 'https://github.com/PatrickkikALT', icon: '/assets/github.svg' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/otherpatrick.bsky.social', icon: '/assets/bluesky.webp' },
  { label: 'Discord', href: 'https://discordapp.com/users/432556223527911434', icon: '/assets/discord.png' },
  { label: 'Email', href: 'mailto:pa.kikkert@gmail.com', icon: '/assets/email.svg' },
];

const quickLinks = [
  { label: 'GitHub', href: 'https://github.com/PatrickkikALT', icon: Github },
  { label: 'Email', href: 'mailto:pa.kikkert@gmail.com', icon: Mail },
  { label: 'Resume', href: '/resume', icon: UserRound, local: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/patrick-kikkert-29a439346/', icon: BriefcaseBusiness },
];

const categoryOrder = [
  { key: 'games', title: 'Games', description: 'My unity projects' },
  { key: 'editor', title: 'Editor', description: 'Tools built to smooth out Unity workflows.' },
  { key: 'misc', title: 'Misc', description: 'Miscellaneous projects.' },
];

const categorySets = {
  games: new Set(['chunivr', 'factory51', 'breakntake', 'pouventure', 'pestpatrol', 'bubblegame']),
  editor: new Set(['variablesignalreceiver', 'localisation', 'scenelocktool']),
  misc: new Set(['massremovearcs', 'raylibminecraft', 'steganography', 'cpprenderer', 'storingbot', 'disruptiveaudiobot']),
};

const skills = [
  {
    title: 'C#',
    nl: 'Mijn meest gebruikte programmeertaal, ik gebruik het al meer dan 3 jaar en heb er ook ervaring in buiten Unity.',
    en: 'My most used programming language with around 4 years of experience, including projects outside of Unity.',
  },
  {
    title: 'C/C++',
    nl: 'Hele fijne talen om in te werken, maar mijn niveau ligt nog niet heel hoog. Ik wil hier meer van leren en dieper op ingaan.',
    en: "Some of my favorite languages to work with, though I'm still improving and looking forward to doing more advanced projects.",
  },
  {
    title: 'Python',
    nl: 'Gebruik ik vooral voor kleinere, snelle tools. Ik kan het prima gebruiken voor grotere dingen, ook al gaat mijn voorkeur naar andere talen.',
    en: "Mostly used for small and quick tools. Comfortable for use in larger projects, but I'd rather use something else.",
  },
  {
    title: 'Java',
    nl: 'Mijn kennis in Java komt voornamelijk door het rondzoeken in de code van Minecraft, waarvoor ik ook mods heb gemaakt. De taal is best dichtbij C#, wat me hielp het snel te begrijpen.',
    en: "Knowledge mainly gained by exploring Minecraft's code and creating mods. Java is similar to C#, which made it easier to learn.",
  },
  {
    title: 'Unity Editor (Shader Graphs)',
    nl: 'Ervaring met de Unity Editor, zoals het maken van verschillende soorten particles en shaders met de ingebouwde Unity Shader Graphs.',
    en: 'Experience with the Unity Editor, like creating various particles and shaders using the built-in Shader Graph.',
  },
  {
    title: { nl: 'Nederlands', en: 'Dutch' },
    nl: 'Moedertaal (hoog niveau, schrijven niet het beste).',
    en: 'Native language (strong speaking skills; writing can be improved).',
  },
  {
    title: { nl: 'Engels', en: 'English' },
    nl: 'Vloeiend, bijna beter dan Nederlands, geleerd door gamen.',
    en: 'Fluent, learned largely through gaming and practice.',
  },
  {
    title: { nl: 'Chinees', en: 'Chinese' },
    nl: 'A1 niveau, behaald met een HSK-certificaat na een keuzedeel op het Deltion College.',
    en: 'A1 level, obtained an HSK certificate after an elective course at Deltion College.',
  },
];

const experience = [
  {
    title: { nl: 'Creative Developer MBO-4', en: 'Creative Developer (MBO-4)' },
    label: { nl: 'Instelling', en: 'Institution' },
    place: 'Deltion College',
    nl: 'Momenteel bezig met de opleiding. Hier leer ik omgaan met de Unity Editor, Blender en C#.',
    en: 'Currently studying this program. Learning to work with the Unity Editor, Blender, and C#.',
  },
  {
    title: { nl: 'MAVO-tl', en: 'MAVO-tl' },
    label: { nl: 'Instelling', en: 'Institution' },
    place: 'RSG Wolfsbos locatie Groene Driehoek',
    nl: "Opleiding afgerond met alleen maar 7's of hoger in de profielen Techniek, Economie en Groen.",
    en: 'Completed with grades of 7 or higher in the Techniek, Economie, and Groen profiles.',
  },
  {
    title: { nl: 'Hulpkracht', en: 'Store Assistant' },
    label: { nl: 'Bedrijf', en: 'Company' },
    place: 'LIDL',
    nl: "Bijbaan waarbij ik vooral kassa werk doe, maar soms ook vakkenvullen. Dit heeft me geholpen met het omgaan met klanten en collega's, en heeft me socialer gemaakt. Ik werk hier om de week 10 uur.",
    en: 'Part time job primarily operating the cash register and occasional shelf stocking. Helped improve customer and colleague interaction skills. I work 10 hours every other week.',
  },
];

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = path.includes('#') ? path.slice(path.indexOf('#')) : '';
  if (hash) {
    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function SmartLink({ href, local, children, className, ariaLabel }) {
  const isLocal = local || href.startsWith('/') || href.startsWith('#');
  if (!isLocal) {
    return (
      <a className={className} href={href} target={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'} rel="noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <a
      className={className}
      href={href}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        navigateTo(href.startsWith('#') ? `${window.location.pathname}${href}` : href);
      }}
    >
      {children}
    </a>
  );
}

function Header({ currentPath }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Resume', href: '/resume' },
  ];
  const activeHref = currentPath.includes('#projects') ? '/#projects' : currentPath.split('?')[0];

  return (
    <header className="site-header">
      <SmartLink href="/" className="brand" ariaLabel="Go to home">
        <img src="/assets/avatar.png" alt="" />
        <span>Patrick Kikkert</span>
      </SmartLink>

      <button className="icon-button nav-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {links.map((link) => (
          <SmartLink key={link.href} href={link.href} className={activeHref === link.href ? 'active' : ''}>
            {link.label}
          </SmartLink>
        ))}
      </nav>

      <div className="social-strip">
        {socials.map((social) => (
          <a key={social.label} href={social.href} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={social.label}>
            <img src={social.icon} alt="" />
          </a>
        ))}
      </div>
    </header>
  );
}

function getCategory(project) {
  for (const category of categoryOrder) {
    if (categorySets[category.key].has(project.id)) return category.key;
  }
  return 'misc';
}

function getBalancedColumns(count) {
  if (count <= 1) return 1;
  if (count <= 4) return count;
  if (count % 3 === 0) return 3;
  if (count % 4 === 1) return 3;
  return 4;
}

function ProjectCard({ project, featured = false }) {
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

function Home({ projects }) {
  const validProjects = projects.filter((project) => project.id && project.title);
  const grouped = useMemo(() => {
    return categoryOrder.reduce((acc, category) => {
      acc[category.key] = validProjects.filter((project) => getCategory(project) === category.key);
      return acc;
    }, {});
  }, [validProjects]);

  const featured = validProjects.find((project) => project.id === 'chunivr') ?? validProjects[0];

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

function ProjectDetail({ projects, id }) {
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
  const activeImage = galleryImages[selectedImage];
  const showGalleryControls = galleryImages.length > 1;
  const changeImage = (direction) => {
    setSelectedImage((current) => (current + direction + galleryImages.length) % galleryImages.length);
    setImageZoom(1);
  };
  const openLightbox = () => {
    setImageZoom(1);
    setLightboxOpen(true);
  };

  return (
    <section className="detail-shell">
      <SmartLink href="/" className="back-link"><ArrowLeft size={17} /> Back to home</SmartLink>
      <div className="detail-header">
        <div>
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
            <img
              src={`/${activeImage}`}
              alt={`${project.title} enlarged screenshot ${selectedImage + 1}`}
              style={{ transform: `scale(${imageZoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}

      {project.information?.length > 0 && (
        <div className="article-flow">
          {project.information.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}

    </section>
  );
}

function Resume() {
  const [lang, setLang] = useState(() => localStorage.getItem('site-lang') || 'en');
  const t = (value) => (typeof value === 'string' ? value : value[lang]);

  useEffect(() => {
    localStorage.setItem('site-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <section className="resume-shell">
      <div className="resume-hero">
        <img src="/assets/avatar.png" alt="Patrick Kikkert" />
        <div>
          <h1>Patrick Kikkert</h1>
          <p>{lang === 'nl' ? 'Programmeur & Creative Developer' : 'Programmer & Creative Developer'}</p>
        </div>
        <div className="language-switch" aria-label="Resume language">
          <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button type="button" className={lang === 'nl' ? 'active' : ''} onClick={() => setLang('nl')}>NL</button>
        </div>
      </div>

      <div className="resume-contact">
        <a href="tel:0682798379"><Phone size={17} /> 06 82798379</a>
        <a href="mailto:pa.kikkert@gmail.com"><Mail size={17} /> pa.kikkert@gmail.com</a>
        <span><Moon size={17} /> 17 {lang === 'nl' ? 'november' : 'November'} 2007</span>
      </div>

      <ResumeSection title={lang === 'nl' ? 'Over mij' : 'About me'} icon={UserRound}>
        <p>{lang === 'nl' ? "Mijn naam is Patrick Kikkert. Ik ben een C# programmeur met veel passie voor het maken van leuke en fijne programma's of games." : 'My name is Patrick Kikkert. I am a C# programmer with a strong passion for creating enjoyable applications and games.'}</p>
        <p>{lang === 'nl' ? 'Ik werk vooral in de backend en vind het belangrijk om dingen zo makkelijk mogelijk te maken voor klant of collega.' : 'I mainly work on backend development and focus on making things as easy as possible for clients and colleagues.'}</p>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? 'Vaardigheden' : 'Skills'} icon={Languages}>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={t(skill.title)}>
              <h3>{t(skill.title)}</h3>
              <p>{skill[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? 'Werk en Studie ervaring' : 'Work & Education'} icon={GraduationCap}>
        <div className="timeline">
          {experience.map((item) => (
            <article key={t(item.title)}>
              <h3>{t(item.title)}</h3>
              <p><strong>{t(item.label)}:</strong> {item.place}</p>
              <p>{item[lang]}</p>
            </article>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title={lang === 'nl' ? "Hobby's" : 'Hobbies'} icon={MapPin}>
        <p>{lang === 'nl' ? 'Mijn grootste hobby is gamen, specifiek Rhythm en Arcade Rhythm Games.' : 'My biggest hobby is gaming, especially rhythm and arcade rhythm games.'}</p>
        <p>{lang === 'nl' ? 'Daarnaast vind ik astrofotografie heel leuk, en ben ik veel bezig met reverse engineering.' : 'I also enjoy astrophotography and spend a lot of time on reverse engineering projects.'}</p>
        <p>{lang === 'nl' ? 'Ik vind het heel rustgevend en fijn om te wandelen, vooral bergwandelingen in mooie omgevingen buiten Nederland, zoals Scandinavië of Duitsland.' : 'I find walking very relaxing, especially mountain hikes in scenic areas outside the Netherlands, like Scandinavia or Germany.'}</p>
      </ResumeSection>
    </section>
  );
}

function ResumeSection({ title, icon: Icon, children }) {
  return (
    <section className="resume-section">
      <h2><Icon size={20} /> {title}</h2>
      {children}
    </section>
  );
}

function App() {
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

createRoot(document.getElementById('root')).render(<App />);
