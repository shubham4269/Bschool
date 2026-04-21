import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CollegeLogoStrip.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CollegeLogoStrip({ isHeroStrip = false }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partners/homepage`);
      const fetchedCategories = response.data.categories;
      
      // Ensure categories are sorted properly - "Our Authorized Academic Partners" should be first
      const sortedCategories = fetchedCategories.sort((a, b) => {
        // If one category has "Academic Partners" in title, prioritize it
        if (a.title.toLowerCase().includes('academic partners') && !b.title.toLowerCase().includes('academic partners')) {
          return -1;
        }
        if (!a.title.toLowerCase().includes('academic partners') && b.title.toLowerCase().includes('academic partners')) {
          return 1;
        }
        return 0;
      });
      
      setCategories(sortedCategories);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || categories.length === 0) {
    return null;
  }

  // Filter categories: 
  // - Hero strip: Always use FIRST category only (should be "Our Authorized Academic Partners")
  // - Regular section: Show all categories
  const displayCategories = isHeroStrip ? categories.slice(0, 1) : categories;

  // For hero strip, ensure we're using the first category which should be "Our Authorized Academic Partners"
  if (isHeroStrip && categories.length > 0) {
    console.log('Hero strip using category:', categories[0].title);
  }

  return (
    <>
      {displayCategories.map((category) => {
        return (
          <section 
            key={category._id} 
            className={`college-logo-strip ${isHeroStrip ? 'hero-strip' : ''}`}
          >
            {!isHeroStrip && (
              <div className="container">
                <div className="strip-header">
                  <h2>{category.title}</h2>
                </div>
              </div>
            )}
            
            {isHeroStrip ? (
              // Hero strip: horizontal scrolling
              <div className="logo-scroll-container">
                <div className="logo-scroll-track">
                  {[...category.logos, ...category.logos].map((logo, index) => (
                    <div key={index} className="logo-item">
                      <img src={logo.imageUrl} alt={logo.name} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Regular section: centered grid layout
              <div className="logo-grid-container">
                <div className="logo-grid">
                  {category.logos.map((logo, index) => (
                    <div key={index} className="logo-grid-item">
                      <img src={logo.imageUrl} alt={logo.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}

export default CollegeLogoStrip;
