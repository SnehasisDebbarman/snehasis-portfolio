const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const parser = require('@babel/parser');
const ts = require('typescript');
const directory = 'public/blog';
const files = fs.readdirSync(directory).filter(name => /^interview-\d{3}-.*\.md$/.test(name)).sort();
assert.equal(files.length, 100, 'The series must contain exactly 100 articles');
const snippets = new Map();
for (const [index, file] of files.entries()) {
  const source = fs.readFileSync(`${directory}/${file}`, 'utf8');
  const number = index + 1;
  assert.match(source, new RegExp(`questionNumber: "${number}"`));
  assert.match(source, new RegExp(`title: "${number}\\. `));
  for (const heading of ['The answer', 'Code example', 'Walk through the result', 'Interview pitfalls', 'Sources and further reading']) {
    assert.ok(source.includes(`## ${heading}`), `${file}: missing ${heading}`);
  }
  assert.match(source, /\]\(https:\/\//, `${file}: missing external source`);
  const blocks = [...source.matchAll(/^```(\w+)\n([\s\S]*?)^```/gm)];
  assert.ok(blocks.length, `${file}: missing example`);
  snippets.set(number, blocks.map(match => match[2]));
  for (const [, language, code] of blocks) {
    if (['js', 'jsx', 'ts', 'tsx'].includes(language)) {
      parser.parse(code, { sourceType: 'unambiguous', plugins: ['jsx', 'typescript'] });
    }
  }
  for (const [, slug] of source.matchAll(/\]\(\/blog\/([^)?#]+)\)/g)) {
    assert.ok(fs.existsSync(`${directory}/${slug}.md`), `${file}: broken link ${slug}`);
  }
  if (index) assert.ok(source.includes(`/blog/${files[index - 1].replace('.md', '')}`));
  if (index < 99) assert.ok(source.includes(`/blog/${files[index + 1].replace('.md', '')}`));
}
async function main() {
  let executed = 0;
  for (let number = 1; number <= 40; number++) {
    if ([29, 37, 38, 39].includes(number)) continue; // Network, DOM and multi-file module examples.
    const logs = [];
    const handles = [];
    const sandbox = {
      console: { log: (...args) => logs.push(args), error: error => { throw error; } },
      setTimeout: (fn, ms) => { const handle = setTimeout(fn, ms); handles.push(handle); return handle; },
      clearTimeout, setInterval: (fn, ms) => { const handle = setInterval(fn, ms); handles.push(handle); return handle; },
      clearInterval, queueMicrotask, performance, structuredClone,
    };
    try {
      vm.runInNewContext(snippets.get(number)[0], sandbox, { timeout: 1000 });
      await new Promise(resolve => setTimeout(resolve, 110));
      const expected = {
        21: ['1: start', '2: end', '3: promise', '4: timer'],
        23: ['sync', 'microtask A', 'microtask B', 'microtask C', 'timer'],
        24: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        31: ['Search:'],
        32: ['first', 'later'],
        34: [6, 0, 7],
      };
      if (expected[number]) assert.deepEqual(logs.map(args => args[0]), expected[number], `Question ${number}: output`);
      executed++;
    } finally {
      handles.forEach(handle => { clearTimeout(handle); clearInterval(handle); });
    }
  }
  // Exercise the complete local-only CRUD example, including its production guard.
  const exports = {};
  const environment = { NODE_ENV: 'development' };
  const compiled = ts.transpileModule(snippets.get(94)[0], { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(compiled, { exports, process: { env: environment }, Response, Request, URL, crypto: globalThis.crypto });
  assert.equal((await exports.POST(new Request('http://localhost/api/notes', { method: 'POST', body: '{}' }))).status, 400);
  const created = await exports.POST(new Request('http://localhost/api/notes', { method: 'POST', body: JSON.stringify({ text: 'Learn scope' }) }));
  assert.equal(created.status, 201);
  const note = await created.json();
  const url = `http://localhost/api/notes?id=${note.id}`;
  assert.equal((await exports.GET()).status, 200);
  const updated = await exports.PUT(new Request(url, { method: 'PUT', body: JSON.stringify({ text: 'Learn hooks' }) }));
  assert.equal((await updated.json()).text, 'Learn hooks');
  assert.equal((await exports.DELETE(new Request(url, { method: 'DELETE' }))).status, 204);
  assert.equal((await exports.DELETE(new Request(url, { method: 'DELETE' }))).status, 404);
  environment.NODE_ENV = 'production';
  assert.equal((await exports.GET()).status, 503);
  console.log(`100 articles verified: numbering, sections, links and snippet syntax; ${executed} JavaScript examples executed; CRUD flow and production guard passed.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
