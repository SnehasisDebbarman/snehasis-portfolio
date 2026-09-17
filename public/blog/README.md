# Blog posts

Each Markdown file in this folder becomes one article on the portfolio.

To publish a new article:

1. Copy `_TEMPLATE.md` to a lowercase hyphenated filename such as `my-new-post.md`.
2. Update the frontmatter. The `slug` must match the filename without `.md`.
3. Write the article below the closing `---` using Markdown.
4. Run `npm start` locally or `npm run build` before committing.
5. Commit the new `.md` file. The blog index is generated automatically during start, test, and build.

The frontmatter fields are `slug`, `title`, `date`, `readTime`, `category`, and `excerpt`.

## Writing useful articles

Use `_TEMPLATE.md` for setup, a complete example, expected output, pitfalls and sources. Prefer `##` headings: they appear in the automatic table of contents. Fenced code gets a copy button and syntax highlighting when a language is specified. GFM tables, nested lists, links and inline code are supported. Raw HTML is disabled; use Markdown for article layout.

Keep examples self-contained. Label the runtime and filenames, include required imports, and distinguish separate alternatives from files meant to run together. Identify React/Next.js versions when an API is version-dependent. Cite primary sources and use original explanations. Estimate reading time from the finished article, including time to inspect code.

Run `node scripts/check-blog-reader.cjs` (Node.js 22.12+), then `npm run build` before publishing. The check renders every article, verifies Markdown safety and tests exact code copying.
