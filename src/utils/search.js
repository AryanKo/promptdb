import Fuse from 'fuse.js';

let fuseInstance = null;
let lastPrompts = null;

export function getSearchResults(prompts, query) {
  if (!query || query.trim() === '') return prompts;
  
  if (!fuseInstance || lastPrompts !== prompts) {
    fuseInstance = new Fuse(prompts, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'tags', weight: 2 }
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
    lastPrompts = prompts;
  }
  
  const results = fuseInstance.search(query);
  return results.map(result => result.item);
}
