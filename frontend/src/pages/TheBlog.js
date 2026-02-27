import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PageHero from '../components/PageHero';
import '../styles/TheBlog.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function TheBlog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState(['All']);
  
  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    fetchFeaturedBlog();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog`);
      const uniqueCategories = ['All', ...new Set(response.data.blogs.map(blog => blog.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFeaturedBlog = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/featured`);
      setFeaturedBlog(response.data);
    } catch (error) {
      console.error('Error fetching featured blog:', error);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9
      };
      
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }

      const response = await axios.get(`${API_URL}/api/blog`, { params });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="the-blog-page">
      <PageHero
        title="The Blog"
        subtitle="Expert advice on admissions, specializations, entrance exams, and career planning."
        breadcrumb={[{ label: 'Blog' }]}
      />

      {/* Featured Blog Section */}
      {featuredBlog && (
        <section className="featured-blog">
          <div className="container">
            <div className="featured-content">
              <div className="featured-image">
                <img src={featuredBlog.featuredImage} alt={featuredBlog.title} />
                <span className="category-badge">{featuredBlog.category}</span>
              </div>
              <div className="featured-text">
                <h2>{featuredBlog.title}</h2>
                <p className="excerpt">{featuredBlog.excerpt}</p>
                <div className="meta">
                  <span>{featuredBlog.readTime} min read</span>
                  <span>•</span>
                  <span>{formatDate(featuredBlog.createdAt)}</span>
                </div>
                <Link to={`/the-latest/${featuredBlog.slug}`} className="read-article-btn">
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="category-filters">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="no-blogs">No blogs found in this category.</div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <article key={blog._id} className="blog-card">
                  <Link to={`/the-latest/${blog.slug}`}>
                    <div className="blog-image">
                      <img src={blog.featuredImage} alt={blog.title} />
                      <span className="category-tag">{blog.category}</span>
                    </div>
                    <div className="blog-content">
                      <h3>{blog.title}</h3>
                      <p className="excerpt">{blog.excerpt}</p>
                      <div className="blog-meta">
                        <span>{blog.readTime} min read</span>
                        <span>•</span>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <span className="read-more">Read More →</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="container">
          <h2>Discover personalized insights tailored to your lifestyle.</h2>
          <Link to="/contact" className="cta-button">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default TheBlog;
