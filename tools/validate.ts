import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  CITATION_PATTERN,
  INDEX_PATH,
  PREFIX_TO_TYPE,
  ROOT,
  STEERING_DIR,
  listMarkdown,
  loadSpecs,
  rel,
  renderIndex,
  splitFrontMatter,
} from './lib.ts';

const ALWAYS_LINE_BUDGET = 150;
const STEERING_MODES = ['always', 'fileMatch', 'manual', 'auto'];

const errors: string[] = [];
const warnings: string[] = [];
const fail = (file: string, msg: string) => errors.push(`${file}: ${msg}`);
const warn = (file: string, msg: string) => warnings.push(`${file}: ${msg}`);

const stripCode = (text: string) => text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');

// 1. Front-matter, file name, prefix and type.
const schema = JSON.parse(readFileSync(join(ROOT, 'schema', 'front-matter.schema.json'), 'utf8'));
const ajv = new Ajv2020.default({ allErrors: true, strict: true });
addFormats.default(ajv);
const checkSchema = ajv.compile(schema);

const specs = loadSpecs();
const byId = new Map<string, Record<string, unknown>>();
const schemaValid = new Set<string>();

for (const spec of specs) {
  const file = rel(spec.path);
  const raw = readFileSync(spec.path, 'utf8');
  const parsed = splitFrontMatter(raw);
  if (parsed.error) {
    fail(file, `front-matter is not valid YAML: ${parsed.error}`);
    continue;
  }
  if (!parsed.data) {
    fail(file, 'missing front-matter');
    continue;
  }
  const id = String(spec.data.spec_id);
  if (!checkSchema(spec.data)) {
    for (const e of checkSchema.errors ?? []) fail(file, `front-matter ${e.instancePath || '/'} ${e.message}`);
    // Keep the ID known, so citations to it do not report a second, misleading error.
    if (typeof spec.data.spec_id === 'string' && !byId.has(id)) byId.set(id, spec.data);
    continue;
  }
  schemaValid.add(spec.path);
  const prefix = id.split('-')[0];
  if (PREFIX_TO_TYPE[prefix] !== spec.data.spec_type) {
    fail(file, `spec_type must be "${PREFIX_TO_TYPE[prefix]}" for prefix ${prefix}`);
  }
  if (!basename(spec.path).startsWith(`${id}-`)) {
    fail(file, `file name must start with "${id}-"`);
  }
  if (byId.has(id)) fail(file, `duplicate spec_id ${id}`);
  else byId.set(id, spec.data);
}

// 2. Deprecated specs point to a live replacement.
for (const spec of specs) {
  const d = spec.data;
  if (d.status !== 'deprecated' || !schemaValid.has(spec.path)) continue;
  const target = byId.get(String(d.replacement));
  if (!target) fail(rel(spec.path), `replacement ${d.replacement} does not exist`);
  else if (target.status === 'deprecated') fail(rel(spec.path), `replacement ${d.replacement} is deprecated too`);
}

// 3. Citations and relative links resolve, in every Markdown file of the repo.
const rootMarkdown = readdirSync(ROOT)
  .filter((n) => n.endsWith('.md'))
  .map((n) => join(ROOT, n));
const allMarkdown = [...rootMarkdown, ...listMarkdown(join(ROOT, 'specs')), ...listMarkdown(STEERING_DIR)];

for (const path of allMarkdown) {
  const file = rel(path);
  const text = stripCode(readFileSync(path, 'utf8'));
  for (const m of text.matchAll(CITATION_PATTERN)) {
    if (!byId.has(m[1])) fail(file, `cites unknown spec [${m[1]}]`);
  }
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const local = decodeURIComponent(target.split('#')[0]);
    if (!existsSync(resolve(dirname(path), local))) fail(file, `broken link ${target}`);
  }
}

// 4. Steering: valid mode, patterns as arrays, always budget, draft citations.
let alwaysLines = 0;
for (const path of listMarkdown(STEERING_DIR)) {
  const file = rel(path);
  const raw = readFileSync(path, 'utf8');
  const { data } = splitFrontMatter(raw);
  const mode = data?.inclusion;
  if (!STEERING_MODES.includes(String(mode))) {
    fail(file, `inclusion must be one of ${STEERING_MODES.join(', ')}`);
    continue;
  }
  if (mode === 'fileMatch') {
    const p = data?.fileMatchPattern;
    const list = Array.isArray(p) ? p : [p];
    if (!p || list.some((x) => typeof x !== 'string' || x.includes(','))) {
      fail(file, 'fileMatchPattern must be a string or an array of strings, with no commas');
    }
  }
  if (mode === 'always') alwaysLines += raw.replace(/\r\n/g, '\n').trimEnd().split('\n').length;
  for (const m of stripCode(raw).matchAll(CITATION_PATTERN)) {
    const status = byId.get(m[1])?.status;
    if (status && status !== 'approved') warn(file, `cites [${m[1]}], which is ${status}`);
  }
}
if (alwaysLines > ALWAYS_LINE_BUDGET) {
  fail('.kiro/steering', `always steering has ${alwaysLines} lines, budget is ${ALWAYS_LINE_BUDGET}`);
}

// 5. INDEX.md is fresh.
const expected = renderIndex(specs);
const actual = existsSync(INDEX_PATH) ? readFileSync(INDEX_PATH, 'utf8').replace(/\r\n/g, '\n') : '';
if (actual !== expected) fail('INDEX.md', 'out of date, run `npm run index`');

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`${specs.length} specs, ${alwaysLines}/${ALWAYS_LINE_BUDGET} always lines, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
