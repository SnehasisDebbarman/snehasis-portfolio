const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<div id="root"></div>', { url: 'https://snehasis.in/markdown' });
Object.assign(global, { window: dom.window, document: dom.window.document, Element: dom.window.Element, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
Object.defineProperty(global, 'navigator', { configurable: true, value: dom.window.navigator });
const React = require('react');
const { act } = require('react-dom/test-utils');
const { createRoot } = require('react-dom/client');
const { MemoryRouter } = require('react-router-dom');
require.extensions['.scss'] = module => { module.exports = {}; };
const originalJs = require.extensions['.js'];
require.extensions['.js'] = (module, filename) => {
  if (!filename.startsWith(path.resolve('src') + path.sep)) return originalJs(module, filename);
  const compiled = require('@babel/core').transformFileSync(filename, {
    babelrc: false, configFile: false,
    presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  }).code;
  module._compile(compiled, filename);
};
const { default: Editor, DRAFT_KEY, SAMPLE, MAX_FILE_BYTES, downloadName } = require('../src/components/MarkdownEditor');
assert.equal(downloadName('../note.txt'), '..-note.txt.md');
assert.equal(downloadName(''), 'untitled.md');
assert.equal(downloadName('Readme.MD'), 'Readme.MD');
let root;
const mount = async () => {
  root = createRoot(document.getElementById('root'));
  await act(async () => root.render(React.createElement(MemoryRouter, null, React.createElement(Editor))));
};
const click = async label => {
  const button = [...document.querySelectorAll('button')].find(button => button.textContent === label);
  assert.ok(button, label);
  await act(async () => button.click());
};
const type = async (selector, value) => {
  const node = document.querySelector(selector);
  const proto = node.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(node, value);
    node.dispatchEvent(new window.Event('input', { bubbles: true }));
  });
};
const importFile = async file => {
  const input = document.querySelector('input[type="file"]');
  Object.defineProperty(input, 'files', { configurable: true, value: [file] });
  await act(async () => input.dispatchEvent(new window.Event('change', { bubbles: true })));
};
(async () => {
  localStorage.setItem(DRAFT_KEY, 'invalid json');
  await mount();
  assert.equal(document.querySelector('textarea').value, SAMPLE);
  assert.match(document.title, /Markdown editor/);
  const source = '# Draft\n\n**Live**\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```js\nconst a = 1;\n```\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))';
  await type('textarea', source);
  assert.equal(document.querySelector('article strong').textContent, 'Live');
  assert.ok(document.querySelector('article table'));
  assert.ok(!document.querySelector('article script'));
  assert.ok(!document.querySelector('article a[href^="javascript:"]'));
  await type('input[aria-label="Document name"]', 'notes');
  await act(async () => new Promise(resolve => setTimeout(resolve, 400)));
  assert.deepEqual(JSON.parse(localStorage.getItem(DRAFT_KEY)), { markdown: source, name: 'notes' });
  await act(async () => root.unmount());
  await mount();
  assert.equal(document.querySelector('textarea').value, source);
  await click('Preview');
  assert.equal(document.querySelector('textarea'), null);
  await click('Editor');
  assert.equal(document.querySelector('article'), null);
  let copied;
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { copied = value; } } });
  await click('Copy Markdown');
  assert.equal(copied, source);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
  await click('Copy Markdown');
  assert.match(document.querySelector('[role="status"]').textContent, /Clipboard unavailable/);
  let blob, filename, revoked;
  global.URL.createObjectURL = value => { blob = value; return 'blob:test'; };
  global.URL.revokeObjectURL = value => { revoked = value; };
  window.HTMLAnchorElement.prototype.click = function () { filename = this.download; };
  await click('Download .md ↓');
  assert.equal(filename, 'notes.md');
  assert.equal(await blob.text(), source);
  window.confirm = () => false;
  await click('New');
  assert.equal(document.querySelector('textarea').value, source);
  window.confirm = () => true;
  await importFile({ name: 'huge.md', size: MAX_FILE_BYTES + 1 });
  assert.match(document.querySelector('[role="status"]').textContent, /smaller than 1 MB/);
  await importFile({ name: 'bad.exe', size: 1 });
  assert.match(document.querySelector('[role="status"]').textContent, /Choose a .md/);
  await importFile({ name: 'broken.md', size: 1, text: async () => { throw Error('read'); } });
  assert.equal(document.querySelector('textarea').value, source);
  await importFile({ name: 'readme.md', size: 12, text: async () => '# Imported' });
  assert.equal(document.querySelector('textarea').value, '# Imported');
  assert.equal(document.querySelector('input[aria-label="Document name"]').value, 'readme.md');
  await click('New');
  assert.equal(document.querySelector('textarea').value, '');
  assert.match(document.querySelector('article').textContent, /Your words will appear here/);
  const storageProto = window.Storage.prototype;
  const setItem = storageProto.setItem;
  storageProto.setItem = () => { throw Error('Storage blocked'); };
  await type('textarea', 'still editable');
  await act(async () => new Promise(resolve => setTimeout(resolve, 400)));
  assert.match(document.body.textContent, /Local saving unavailable/);
  storageProto.setItem = setItem;
  await act(async () => root.unmount());
  await new Promise(resolve => setTimeout(resolve, 1100));
  assert.equal(revoked, 'blob:test');
  const routes = fs.readFileSync('src/App.js', 'utf8');
  const rewrites = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites;
  for (const route of ['/markdown', '/md-viewer']) {
    assert.ok(routes.includes(`path="${route}" element={<MarkdownEditor />}`));
    for (const url of [route, route + '/']) assert.ok(rewrites.some(rule => rule.source === url && rule.destination === '/index.html'));
  }
  dom.window.close();
  console.log('Markdown checks passed: live editing, GFM, XSS safety, modes, persistence/reload, storage failure, clipboard/fallback, import limits/errors, exact download, new-draft protection, and route rewrites.');
})().catch(error => { console.error(error); process.exitCode = 1; });
