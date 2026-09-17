import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts.generated";
import MarkdownContent from "./MarkdownContent";
import scss from "../styles/Blog.module.scss";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");

  useEffect(() => {
    if (!post) return undefined;

    const controller = new AbortController();
    setContent("");
    setContentError("");

    fetch(post.contentPath, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Article could not be loaded.");
        return response.text();
      })
      .then((markdown) => {
        if (!controller.signal.aborted) setContent(markdown.replace(/^---[\s\S]*?---\s*/, ""));
      })
      .catch((error) => {
        if (error.name !== "AbortError") setContentError(error.message);
      });

    return () => controller.abort();
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <section className={scss.blog_section}>
        <div className={scss.not_found}>
          <h2>Article Not Found</h2>
          <p>The post you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className={scss.back_btn}>
            ← BACK TO ARTICLES
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className={scss.article_section}>
      <div className={scss.article_container}>
        <Link to="/blog" className={scss.back_btn}>
          ← BACK TO ARTICLES
        </Link>

        <header className={scss.article_header}>
          <div className={scss.article_meta}>
            <span className={scss.article_category}>{post.category}</span>
            <span className={scss.article_dot}>•</span>
            <span className={scss.article_date}>{post.date}</span>
            <span className={scss.article_dot}>•</span>
            <span className={scss.article_read}>{post.readTime}</span>
          </div>
          <h1 className={scss.article_title}>{post.title}</h1>
        </header>

        <div className={scss.article_body}>
          {contentError ? <p>{contentError}</p> : content ? <MarkdownContent markdown={content} /> : <p>Loading article…</p>}
        </div>
      </div>
    </article>
  );
}
