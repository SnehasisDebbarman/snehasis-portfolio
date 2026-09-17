import { Fragment } from "react";

function safeHref(value) {
  const href = value.trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : null;
}

function renderInline(value, keyPrefix) {
  const parts = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|\[[^\]]+\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = pattern.exec(value))) {
    if (match.index > lastIndex) parts.push(value.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(<code key={`${keyPrefix}-${index++}`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**") || token.startsWith("__")) {
      parts.push(<strong key={`${keyPrefix}-${index++}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") || token.startsWith("_")) {
      parts.push(<em key={`${keyPrefix}-${index++}`}>{token.slice(1, -1)}</em>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = link && safeHref(link[2]);
      parts.push(
        href ? (
          <a key={`${keyPrefix}-${index++}`} href={href} target="_blank" rel="noreferrer">
            {link[1]}
          </a>
        ) : (
          link ? link[1] : token
        ),
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < value.length) parts.push(value.slice(lastIndex));
  return parts;
}

export default function MarkdownContent({ markdown }) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(\w*)$/);
    if (fence) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) code.push(lines[index++]);
      index += 1;
      blocks.push(<pre key={`code-${index}`}><code>{code.join("\n")}</code></pre>);
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const Tag = heading[1].length === 2 ? "h2" : "h3";
      blocks.push(<Tag key={`heading-${index}`}>{renderInline(heading[2], `heading-${index}`)}</Tag>);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) quote.push(lines[index++].replace(/^>\s?/, ""));
      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(quote.join(" "), `quote-${index}`)}</blockquote>);
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/;
    const ordered = /^\d+\.\s+(.+)$/;
    if (unordered.test(line) || ordered.test(line)) {
      const isOrdered = ordered.test(line);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(isOrdered ? ordered : unordered);
        if (!item) break;
        items.push(<li key={`item-${index}`}>{renderInline(item[1], `item-${index}`)}</li>);
        index += 1;
      }
      const List = isOrdered ? "ol" : "ul";
      blocks.push(<List key={`list-${index}`}>{items}</List>);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,4})\s+|^```|^>\s?|^[-*]\s+|^\d+\.\s+/.test(lines[index])) {
      paragraph.push(lines[index++].trim());
    }
    blocks.push(<p key={`paragraph-${index}`}>{renderInline(paragraph.join(" "), `paragraph-${index}`)}</p>);
  }

  return <Fragment>{blocks}</Fragment>;
}
