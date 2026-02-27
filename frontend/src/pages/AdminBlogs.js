import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminBlogs.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AdminBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      const response = await axios.get(`${API_URL}/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      if (error.response?.status === 401) {
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id) => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      await axios.patch(`${API_URL}/api/admin/blogs/${id}/publish`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update publish status');
    }
  };

  const toggleFeature = async (id) => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      await axios.patch(`${API_URL}/api/admin/blogs/${id}/feature`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling feature:', error);
      alert('Failed to update featured status');
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      await axios.delete(`${API_URL}/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleteConfirm(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="admin-blogs-page"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="admin-blogs-page">
      <div className="back-to-dashboard">
        <button onClick={() => navigate('/admin')} className="back-dashboard-btn">
          ← Back to Dashboard
        </button>
      </div>
      <div className="page-header">
        <h1>Blog Management</h1>
        <Link to="/admin/blogs/create" className="create-btn">
          + Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <p>No blogs yet. Create your first blog post!</p>
        </div>
      ) : (
        <div className="blogs-table-container">
          <table className="blogs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="title-cell">{blog.title}</td>
                  <td className="slug-cell">{blog.slug}</td>
                  <td>
                    <button
                      className={`toggle-btn ${blog.isFeatured ? 'active' : ''}`}
                      onClick={() => toggleFeature(blog._id)}
                    >
                      {blog.isFeatured ? '★' : '☆'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`toggle-btn ${blog.isPublished ? 'published' : 'draft'}`}
                      onClick={() => togglePublish(blog._id)}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td>{formatDate(blog.createdAt)}</td>
                  <td className="actions-cell">
                    <Link to={`/admin/blogs/edit/${blog._id}`} className="action-btn edit">
                      Edit
                    </Link>
                    {blog.isPublished && (
                      <a
                        href={`/the-latest/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn preview"
                      >
                        Preview
                      </a>
                    )}
                    <button
                      onClick={() => setDeleteConfirm(blog._id)}
                      className="action-btn delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={() => deleteBlog(deleteConfirm)} className="confirm-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlogs;
