import { writeFileSync } from 'node:fs';
import { INDEX_PATH, loadSpecs, rel, renderIndex } from './lib.ts';

writeFileSync(INDEX_PATH, renderIndex(loadSpecs()), 'utf8');
console.log(`wrote ${rel(INDEX_PATH)}`);
