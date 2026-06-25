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

export function localizeProject(project, lang) {
  const copy = projectTranslations[project.id];
  if (!copy) return project;

  return {
    ...project,
    title: pickLocalized(copy.title, lang),
    description: pickLocalized(copy.description, lang),
    features: pickLocalized(copy.features, lang),
    information: pickLocalized(copy.information, lang),
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
