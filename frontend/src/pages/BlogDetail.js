import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import '../styles/BlogDetail.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${API_URL}/api/blog/${slug}`);
      setBlog(response.data.blog);
      setRelatedBlogs(response.data.relatedBlogs);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="loading">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="error-message">
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/the-latest" className="back-button">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
      </Helmet>

      <div className="blog-detail-page">
        <div className="container">
          <Link to="/the-latest" className="back-link">
            ← Back to Blog
          </Link>

          <article className="blog-article">
            <header className="article-header">
              <h1>{blog.title}</h1>
              <div className="article-meta">
                <span>{blog.readTime} min read</span>
                <span>•</span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </header>

            {blog.featuredImage && (
              <div className="article-image">
                <img src={blog.featuredImage} alt={blog.title} />
              </div>
            )}

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.tags && blog.tags.length > 0 && (
              <div className="article-tags">
                <h4>Tags:</h4>
                <div className="tags-list">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {relatedBlogs && relatedBlogs.length > 0 && (
            <section className="related-articles">
              <h2>Related Articles</h2>
              <div className="related-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <article key={relatedBlog._id} className="related-card">
                    <Link to={`/the-latest/${relatedBlog.slug}`}>
                      <div className="related-image">
                        <img src={relatedBlog.featuredImage} alt={relatedBlog.title} />
                        <span className="category-tag">{relatedBlog.category}</span>
                      </div>
                      <div className="related-content">
                        <h3>{relatedBlog.title}</h3>
                        <p className="excerpt">{relatedBlog.excerpt}</p>
                        <div className="meta">
                          <span>{relatedBlog.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
