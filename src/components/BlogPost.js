import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";
import scss from "../styles/Blog.module.scss";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

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

        <div 
          className={scss.article_body}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
