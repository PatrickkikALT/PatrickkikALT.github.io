export const supportedLanguages = ['en', 'nl'];
const fallbackLanguage = 'en';
export const defaultLanguage = getLanguageFromBrowser()
export const storageKey = 'site-lang';

function getLanguageFromBrowser() {
  const navigatorLang = navigator.language || navigator.userLanguage;
  const langCode = navigatorLang.split('-')[0];
  if (supportedLanguages.includes(langCode)) return langCode;
  return defaultLanguage;
}

export const translations = {
  en: {
    meta: {
      portfolioTitle: 'Portfolio - Patrick Kikkert',
      resumeTitle: 'Resume - Patrick Kikkert',
      description:
        'Portfolio Patrick Kikkert, a software developer from the Netherlands specializing in C# and Unity.',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      resume: 'Resume',
      goToHome: 'Go to home',
      toggleNavigation: 'Toggle navigation',
      mainNavigation: 'Main navigation',
      languageToggle: 'Site language',
    },
    home: {
      heroText:
        "I'm a passionate programmer specializing in C# and Unity Development. This site showcases my projects, skills, and experience.",
      viewProjects: 'View projects',
      hiThere: 'Hi there!',
      introP1BeforeGithub:
        'My name is Patrick Kikkert. This website serves as a hub for things I want to put out there and projects I am proud of. You can find all of my projects over on my ',
      introP1AfterGithub: '.',
      introP2BeforeDiscord: 'For non-work related contact, the fastest way is through my ',
      introP2BetweenDiscordAndEmail: '. For work related purposes, email me at ',
      introP2AfterEmail: '.',
      projectsHeading: 'Projects',
    },
    categories: {
      games: {
        title: 'Games',
        description: 'My unity projects',
      },
      editor: {
        title: 'Editor',
        description: 'Tools built to smooth out Unity workflows.',
      },
      misc: {
        title: 'Misc',
        description: 'Miscellaneous projects.',
      },
    },
    quickLinks: {
      github: 'GitHub',
      email: 'Email',
      resume: 'Resume',
      linkedin: 'LinkedIn',
    },
    project: {
      backToHome: 'Back to home',
      notFound: 'Project not found',
      notFoundDescription: 'The project could not be loaded from the portfolio data.',
      features: 'Features',
      zoom: 'Zoom',
      openProject: 'Open project',
      viewProject: 'View {title}',
      screenshot: '{title} screenshot',
      screenshotNumber: '{title} screenshot {number}',
      enlargedScreenshot: '{title} enlarged screenshot {number}',
      onGithub: '{title} on GitHub',
      imageGallery: '{title} image gallery',
      showImage: 'Show image {number}',
      imagePreview: '{title} image preview',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      zoomImage: 'Zoom image',
      zoomOut: 'Zoom out',
      zoomIn: 'Zoom in',
      closePreview: 'Close image preview',
    },
    resume: {
      subtitle: 'Programmer & Creative Developer',
      birthMonth: 'November',
      aboutMe: 'About me',
      aboutP1:
        'My name is Patrick Kikkert. I am a C# programmer with a strong passion for creating enjoyable applications and games.',
      aboutP2:
        'I mainly work on backend development and focus on making things as easy as possible for clients and colleagues.',
      skills: 'Skills',
      workEducation: 'Work & Education',
      hobbies: 'Hobbies',
      hobbiesP1: 'My biggest hobby is gaming, especially rhythm and arcade rhythm games.',
      hobbiesP2:
        'I also enjoy astrophotography and spend a lot of time on reverse engineering projects.',
      hobbiesP3:
        'I find walking very relaxing, especially mountain hikes in scenic areas outside the Netherlands, like Scandinavia or Germany.',
    },
    common: {
      loading: 'Loading portfolio...',
      name: 'Patrick Kikkert',
    },
  },
  nl: {
    meta: {
      portfolioTitle: 'Portfolio - Patrick Kikkert',
      resumeTitle: 'CV - Patrick Kikkert',
      description: '',
    },
    nav: {
      home: 'Home',
      projects: 'Projecten',
      resume: 'CV',
      goToHome: 'Ga naar home',
      toggleNavigation: 'Schakel navigatie',
      mainNavigation: 'Hoofdnavigatie',
      languageToggle: 'Taal',
    },
    home: {
      heroText: 'Ik ben een gepassioneerde programmeur gespecialiseerd in C# en Unity Development. Deze site toont mijn projecten, vaardigheden en ervaring.',
      viewProjects: 'Bekijk projecten',
      hiThere: 'Hoi!',
      introP1BeforeGithub: 'Ik ben een C# programmeur met veel passie voor het maken van leuke en fijne programma\'s of games. Je kunt al mijn werk vinden op ',
      introP1AfterGithub: '. ',
      introP2BeforeDiscord: 'Als je contact met me wilt opnemen, kun je me bereiken via ',
      introP2BetweenDiscordAndEmail: ' ',
      introP2AfterEmail: '.',
      projectsHeading: 'Projecten',
    },
    categories: {
      games: {
        title: 'Games',
        description: 'Mijn unity projecten',
      },
      editor: {
        title: 'Editor',
        description: 'Tools gebouwd om Unity workflows te verbeteren.',
      },
      misc: {
        title: 'Overig',
        description: 'Andere projecten',
      },
    },
    quickLinks: {
      github: 'GitHub',
      email: 'Email',
      resume: 'CV',
      linkedin: 'LinkedIn',
    },
    project: {
      backToHome: 'Terug naar home',
      notFound: 'Project niet gevonden',
      notFoundDescription: 'Het opgevraagde project werd niet gevonden.',
      features: 'Kenmerken',
      zoom: 'Zoom',
      openProject: 'Open Project',
      viewProject: 'Bekijk Project',
      screenshot: 'Screenshot',
      screenshotNumber: 'Screenshot {number}',
      enlargedScreenshot: 'Groot screenshot',
      onGithub: 'Op GitHub',
      imageGallery: 'Image Gallery',
      showImage: 'Toon Image',
      imagePreview: 'Image Preview',
      previousImage: 'Vorige Image',
      nextImage: 'Volgende Image',
      zoomImage: 'Zoom Image',
      zoomOut: 'Zoom Out',
      zoomIn: 'Zoom In',
      closePreview: 'Sluit Preview',
    },
    resume: {
      subtitle: 'Programmeur & Creative Developer',
      birthMonth: 'november',
      aboutMe: 'Over mij',
      aboutP1:
        "Mijn naam is Patrick Kikkert. Ik ben een C# programmeur met veel passie voor het maken van leuke en fijne programma's of games.",
      aboutP2:
        'Ik werk vooral in de backend en vind het belangrijk om dingen zo makkelijk mogelijk te maken voor klant of collega.',
      skills: 'Vaardigheden',
      workEducation: 'Werk en Studie ervaring',
      hobbies: "Hobby's",
      hobbiesP1: 'Mijn grootste hobby is gamen, specifiek Rhythm en Arcade Rhythm Games.',
      hobbiesP2:
        'Daarnaast vind ik astrofotografie heel leuk, en ben ik veel bezig met reverse engineering.',
      hobbiesP3:
        'Ik vind het heel rustgevend en fijn om te wandelen, vooral bergwandelingen in mooie omgevingen buiten Nederland, zoals Scandinavië of Duitsland.',
    },
    common: {
      loading: '',
      name: 'Patrick Kikkert',
    },
  },
};

function getNestedValue(object, path) {
  return path.split('.').reduce((current, key) => current?.[key], object);
}

export function translate(lang, key, replacements = {}) {
  let value = getNestedValue(translations[lang], key);
  if (!value && lang !== defaultLanguage) {
    value = getNestedValue(translations.en, key);
  }
  const text = value || key;
  return Object.entries(replacements).reduce(
    (result, [placeholder, replacement]) => result.replaceAll(`{${placeholder}}`, replacement),
    text,
  );
}
