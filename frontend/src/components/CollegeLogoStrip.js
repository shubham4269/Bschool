import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CollegeLogoStrip.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CollegeLogoStrip() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partners/homepage`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <>
      {categories.map((category) => {
        // Duplicate logos for seamless infinite scroll
        const duplicatedLogos = [...category.logos, ...category.logos];

        return (
          <section key={category._id} className="college-logo-strip">
            <div className="container">
              <div className="strip-header">
                <h2>{category.title}</h2>
              </div>
              
              <div className="logo-scroll-container">
                <div className="logo-scroll-track">
                  {duplicatedLogos.map((logo, index) => (
                    <div key={index} className="logo-item">
                      <img src={logo.imageUrl} alt={logo.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default CollegeLogoStrip;
