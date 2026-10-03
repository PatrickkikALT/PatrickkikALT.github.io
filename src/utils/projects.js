import { categoryOrder, categorySets } from '../data/categories';
import { projectTranslations } from '../data/projectTranslations';
import { defaultLanguage } from '../data/translations';

function pickLocalized(field, lang) {
  if (!field) return typeof field === 'string' ? field : Array.isArray(field) ? [] : '';
  if (typeof field === 'string') return field;
  const value = field[lang];
  if (Array.isArray(value)) return value.length > 0 ? value : field[defaultLanguage] ?? [];
  if (value) return value;
  return field[defaultLanguage] ?? (Array.isArray(field) ? [] : '');
}

function trimCode(code) {
  return String(code ?? '').replace(/\r\n/g, '\n').replace(/^\n+/, '').replace(/\s+$/, '');
}

function localizeSnippets(snippets, lang) {
  if (!Array.isArray(snippets)) return [];

  return snippets
    .filter((snippet) => snippet && trimCode(typeof snippet.code === 'string' ? snippet.code : pickLocalized(snippet.code, lang)))
    .map((snippet) => ({
      language: snippet.language || 'text',
      filename: snippet.filename || '',
      title: pickLocalized(snippet.title, lang),
      caption: pickLocalized(snippet.caption, lang),
      code: trimCode(typeof snippet.code === 'string' ? snippet.code : pickLocalized(snippet.code, lang)),
    }));
}

export function localizeProject(project, lang) {
  const copy = projectTranslations[project.id];
  const snippets = localizeSnippets(copy?.snippets?.length ? copy.snippets : project.snippets, lang);

  if (!copy) return { ...project, snippets };

  return {
    ...project,
    title: pickLocalized(copy.title, lang),
    description: pickLocalized(copy.description, lang),
    features: pickLocalized(copy.features, lang),
    information: pickLocalized(copy.information, lang),
    snippets,
  };
}

export function localizeProjects(projects, lang) {
  return projects.map((project) => localizeProject(project, lang));
}

export function getCategory(project) {
  for (const category of categoryOrder) {
    if (categorySets[category.key].has(project.id)) return category.key;
  }
  return 'misc';
}

export function getBalancedColumns(count) {
  if (count <= 1) return 1;
  if (count <= 4) return count;
  if (count % 3 === 0) return 3;
  if (count % 4 === 1) return 3;
  return 4;
}
