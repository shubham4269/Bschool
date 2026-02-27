import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminBlogForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    readTime: 5,
    isFeatured: false,
    isPublished: false
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      const response = await axios.get(`${API_URL}/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blog = response.data;
      setFormData({
        ...blog,
        tags: blog.tags.join(', ')
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog');
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'title' && !isEditMode) {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('bschool_admin_token');
      const response = await axios.post(`${API_URL}/api/upload/image`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData(prev => ({ ...prev, featuredImage: response.data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!formData.title || !formData.slug || !formData.category || !formData.excerpt || !formData.content) {
      setError('Please fill in all required fields (Title, Slug, Category, Excerpt, Content)');
      return;
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem('bschool_admin_token');
      const blogData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        featuredImage: formData.featuredImage || '',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        metaTitle: formData.metaTitle.trim(),
        metaDescription: formData.metaDescription.trim(),
        readTime: parseInt(formData.readTime) || 5,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished
      };

      console.log('Submitting blog data:', blogData);

      if (isEditMode) {
        const response = await axios.put(`${API_URL}/api/admin/blogs/${id}`, blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Update response:', response.data);
      } else {
        const response = await axios.post(`${API_URL}/api/admin/blogs`, blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Create response:', response.data);
      }

      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      console.error('Error response:', error.response?.data);
      const errorMsg = error.response?.data?.message || 'Failed to save blog';
      const errorDetails = error.response?.data?.details;
      setError(errorDetails ? `${errorMsg}: ${errorDetails.join(', ')}` : errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-blog-form-page">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Blog' : 'Create New Blog'}</h1>
        <button onClick={() => navigate('/admin/blogs')} className="back-btn">
          ← Back to Blogs
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="blog-form">
        {/* Basic Information */}
        <section className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
            <small>URL-friendly version of the title</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="e.g., Wellness, Nutrition, MBA Tips"
              />
              <small>Enter any category name</small>
            </div>

            <div className="form-group">
              <label>Read Time (minutes) *</label>
              <input
                type="number"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="wellness, nutrition, health (comma-separated)"
            />
          </div>

          <div className="form-group">
            <label>Excerpt *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              required
              placeholder="Brief summary that appears in blog listing cards (2-3 sentences)"
            />
            <small>This preview text appears on the blog listing page</small>
          </div>
        </section>

        {/* Featured Image */}
        <section className="form-section">
          <h2>Featured Image</h2>
          
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
            {formData.featuredImage && (
              <div className="image-preview">
                <img src={formData.featuredImage} alt="Preview" />
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="form-section">
          <h2>Content *</h2>
          
          <div className="form-group">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="20"
              required
              placeholder="Write your blog content here. You can use HTML for formatting."
            />
            <small>Supports HTML formatting</small>
          </div>
        </section>

        {/* SEO */}
        <section className="form-section">
          <h2>SEO Settings</h2>
          
          <div className="form-group">
            <label>Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Leave blank to use blog title"
            />
          </div>

          <div className="form-group">
            <label>Meta Description</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="2"
              placeholder="Leave blank to use excerpt"
            />
          </div>
        </section>

        {/* Status Controls */}
        <section className="form-section">
          <h2>Status</h2>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <span>Featured Blog</span>
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              <span>Published</span>
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/blogs')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Saving...' : isEditMode ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminBlogForm;
