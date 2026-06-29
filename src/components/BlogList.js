import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import scss from "../styles/Blog.module.scss";

export default function BlogList() {
  return (
    <section className={scss.blog_section}>
      <header className={scss.blog_header}>
        <h1 className={scss.blog_title}>Articles & Insights</h1>
        <span className={scss.count}>{String(posts.length).padStart(2, "0")} posts</span>
      </header>

      <div className={scss.posts_list}>
        {posts.map((post) => (
          <div key={post.slug} className={scss.post_card}>
            <div className={scss.left_col}>
              <span className={scss.date}>{post.date}</span>
              <span className={scss.read_time}>{post.readTime}</span>
            </div>
            
            <div className={scss.right_col}>
              <div className={scss.post_meta}>
                <span className={scss.category}>{post.category}</span>
                <h2 className={scss.post_title}>
                  <Link to={`/blog/${post.slug}`} className={scss.title_link}>
                    {post.title}
                  </Link>
                </h2>
                <p className={scss.excerpt}>{post.excerpt}</p>
              </div>
              
              <Link to={`/blog/${post.slug}`} className={scss.read_link}>
                Read Article <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
