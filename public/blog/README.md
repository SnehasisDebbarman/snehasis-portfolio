# Blog posts

Each Markdown file in this folder becomes one article on the portfolio.

To publish a new article:

1. Copy `_TEMPLATE.md` to a lowercase hyphenated filename such as `my-new-post.md`.
2. Update the frontmatter. The `slug` must match the filename without `.md`.
3. Write the article below the closing `---` using Markdown.
4. Run `npm start` locally or `npm run build` before committing.
5. Commit the new `.md` file. The blog index is generated automatically during start, test, and build.

The frontmatter fields are `slug`, `title`, `date`, `readTime`, `category`, and `excerpt`.
