import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminPartners.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AdminPartners() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    displayOrder: 0,
    showOnHomepage: false,
    logos: []
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('bschool_admin_token');
      const response = await axios.get(`${API_URL}/api/admin/partners`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response?.status === 401) {
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category._id);
      setFormData({
        title: category.title,
        displayOrder: category.displayOrder,
        showOnHomepage: category.showOnHomepage,
        logos: category.logos
      });
    } else {
      setEditingCategory(null);
      setFormData({
        title: '',
        displayOrder: categories.length,
        showOnHomepage: false,
        logos: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ title: '', displayOrder: 0, showOnHomepage: false, logos: [] });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('bschool_admin_token');
      const uploadedLogos = [];

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        const response = await axios.post(`${API_URL}/api/upload/image`, formDataUpload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        uploadedLogos.push({
          name: file.name.replace(/\.[^/.]+$/, ''),
          imageUrl: response.data.url,
          order: formData.logos.length + uploadedLogos.length
        });
      }

      setFormData(prev => ({
        ...prev,
        logos: [...prev.logos, ...uploadedLogos]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = (index) => {
    setFormData(prev => ({
      ...prev,
      logos: prev.logos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('bschool_admin_token');
      
      if (editingCategory) {
        await axios.put(`${API_URL}/api/admin/partners/${editingCategory}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/api/admin/partners`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const token = localStorage.getItem('bschool_admin_token');
      await axios.delete(`${API_URL}/api/admin/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  if (loading) {
    return <div className="admin-partners-page"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="admin-partners-page">
      <div className="back-to-dashboard">
        <button onClick={() => navigate('/admin')} className="back-dashboard-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="page-header">
        <h1>Partner Management</h1>
        <button onClick={() => handleOpenModal()} className="create-btn">
          + Add New Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <p>No partner categories yet. Create your first category!</p>
        </div>
      ) : (
        <div className="categories-list">
          {categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-header">
                <div>
                  <h3>{category.title}</h3>
                  <p className="category-meta">
                    {category.logos.length} logos • Order: {category.displayOrder}
                    {category.showOnHomepage && <span className="homepage-badge">Homepage</span>}
                  </p>
                </div>
                <div className="category-actions">
                  <button onClick={() => handleOpenModal(category)} className="action-btn edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(category._id)} className="action-btn delete">
                    Delete
                  </button>
                </div>
              </div>
              <div className="logos-preview">
                {category.logos.slice(0, 6).map((logo, index) => (
                  <div key={index} className="logo-preview-item">
                    <img src={logo.imageUrl} alt={logo.name} />
                  </div>
                ))}
                {category.logos.length > 6 && (
                  <div className="logo-preview-more">+{category.logos.length - 6}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Top 10 Colleges Out of Bihar"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.showOnHomepage}
                      onChange={(e) => setFormData({ ...formData, showOnHomepage: e.target.checked })}
                    />
                    <span>Show on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Upload Logos</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <p className="uploading-text">Uploading...</p>}
              </div>

              {formData.logos.length > 0 && (
                <div className="logos-grid">
                  {formData.logos.map((logo, index) => (
                    <div key={index} className="logo-item">
                      <img src={logo.imageUrl} alt={logo.name} />
                      <button
                        type="button"
                        onClick={() => handleRemoveLogo(index)}
                        className="remove-logo-btn"
                      >
                        ×
                      </button>
                      <input
                        type="text"
                        value={logo.name}
                        onChange={(e) => {
                          const newLogos = [...formData.logos];
                          newLogos[index].name = e.target.value;
                          setFormData({ ...formData, logos: newLogos });
                        }}
                        placeholder="Logo name"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPartners;
