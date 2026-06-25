import { categoryOrder, categorySets } from '../data/categories';

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
