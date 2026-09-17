import { useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts.generated";
import scss from "../styles/Blog.module.scss";

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filteredPosts = posts.filter((post) =>
    (category === "All" || post.category === category) &&
    `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(query.toLowerCase().trim()));
  const postsPerPage = 8;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Calculate index boundaries
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back to the top of the blog articles container
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className={scss.blog_section}>
      <header className={scss.blog_header}>
        <h1 className={scss.blog_title}>Articles & Insights</h1>
        <span className={scss.count}>{String(filteredPosts.length).padStart(2, "0")} posts</span>
      </header>

      <div className={scss.blog_filters}>
        <label>Search articles<input type="search" placeholder="Closures, React hooks, promises…" value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} /></label>
        <label>Topic<select value={category} onChange={(event) => { setCategory(event.target.value); setCurrentPage(1); }}>
          {["All", ...new Set(posts.map((post) => post.category))].map((topic) => <option key={topic}>{topic}</option>)}
        </select></label>
      </div>
      {!filteredPosts.length && <p role="status">No matching articles. Try another topic.</p>}
      <div className={scss.posts_list}>
        {currentPosts.map((post) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={scss.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={scss.page_btn}
            aria-label="Previous page"
          >
            ← PREV
          </button>
          
          <div className={scss.page_numbers}>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  onClick={() => handlePageChange(pageNum)}
                  className={`${scss.page_num_btn} ${currentPage === pageNum ? scss.active_page : ""}`}
                >
                  {String(pageNum).padStart(2, "0")}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={scss.page_btn}
            aria-label="Next page"
          >
            NEXT →
          </button>
        </div>
      )}
    </section>
  );
}
