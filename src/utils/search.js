import Fuse from 'fuse.js';

export function getSearchResults(prompts, query) {
  if (!query || query.trim() === '') return prompts;
  
  const fuse = new Fuse(prompts, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'description', weight: 2 },
      { name: 'tags', weight: 2 }
    ],
    threshold: 0.4,
    ignoreLocation: true,
  });
  
  const results = fuse.search(query);
  return results.map(result => result.item);
}
