const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
const fs = require('node:fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
require.extensions['.scss'] = module => { module.exports = {}; };
const filename = path.resolve('src/components/MarkdownContent.js');
const compiled = require('@babel/core').transformFileSync(filename, {
  babelrc: false, configFile: false,
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
}).code;
const reader = new Module(filename, module);
reader.filename = filename;
reader.paths = Module._nodeModulePaths(path.dirname(filename));
reader._compile(compiled, filename);
const markdown = '## Intro\n\nA **bold** paragraph.\n\n## Example\n\n```js\nconst value = "<script>";\nconsole.log(value);\n```\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))';
const html = renderToStaticMarkup(React.createElement(reader.exports.default, { markdown }));
assert.match(html, /<strong>bold<\/strong>/);
assert.match(html, /<table>/);
assert.match(html, /Copy code/);
assert.match(html, /href="#section-5"/);
assert.match(html, /id="section-5"/);
assert.ok(!html.includes('<script>'));
assert.ok(!html.includes('href="javascript:'));
for (const name of fs.readdirSync('public/blog').filter(name => name.endsWith('.md') && !/^(README|_)/.test(name))) {
  const source = fs.readFileSync(path.join('public/blog', name), 'utf8');
  assert.equal((source.match(/^```/gm) || []).length % 2, 0, `${name}: unclosed code fence`);
  renderToStaticMarkup(React.createElement(reader.exports.default, { markdown: source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '') }));
}
async function checkCopy() {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost' });
  global.window = dom.window;
  global.document = dom.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  let copied;
  Object.defineProperty(global, 'navigator', { configurable: true, value: { userAgent: "node.js", clipboard: { writeText: async text => { copied = text; } } } });
  const { createRoot } = require('react-dom/client');
  const { act } = require('react-dom/test-utils');
  const root = createRoot(document.getElementById('root'));
  await act(async () => root.render(React.createElement(reader.exports.default, { markdown })));
  await act(async () => document.querySelector('button').click());
  assert.equal(copied, 'const value = "<script>";\nconsole.log(value);');
  assert.match(document.body.textContent, /Copied!/);
  await act(async () => root.unmount());
  dom.window.close();
  console.log('Blog reader checks passed: all articles render, GFM, safe URLs, headings and exact clipboard content.');
}
checkCopy().catch(error => { console.error(error); process.exitCode = 1; });
