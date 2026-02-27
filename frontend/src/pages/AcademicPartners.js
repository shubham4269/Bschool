import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHero from '../components/PageHero';
import '../styles/AcademicPartners.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AcademicPartners() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partners`);
      console.log('Fetched partners:', response.data);
      console.log('Categories array:', response.data.categories);
      console.log('Number of categories:', response.data.categories?.length);
      if (response.data.categories && response.data.categories.length > 0) {
        console.log('First category:', response.data.categories[0]);
        console.log('First category logos:', response.data.categories[0].logos);
      }
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="academic-partners-page">
      <PageHero
        title="Academic Partners"
        subtitle="Trusted by 200+ premier institutions across India"
        breadcrumb={[{ label: 'Academic Partners' }]}
      />

      {loading ? (
        <section style={{ background: '#ffffff', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ padding: '60px 20px', color: '#718096', fontSize: '1.2rem' }}>
              Loading partners...
            </div>
          </div>
        </section>
      ) : categories.length === 0 ? (
        <section style={{ background: '#ffffff', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ padding: '60px 20px', color: '#718096', fontSize: '1.2rem' }}>
              No partner categories available yet.
            </div>
          </div>
        </section>
      ) : (
        <>
          {categories.map((category, index) => {
            console.log('Rendering category:', category.title, 'with', category.logos?.length, 'logos');
            return (
              <section 
                key={category._id} 
                style={{ 
                  background: index % 2 === 0 ? '#ffffff' : '#f7fafc',
                  padding: '80px 20px'
                }}
              >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {/* Section Header */}
                  <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: '800', 
                      color: '#1a202c',
                      marginBottom: '15px'
                    }}>
                      {category.title}
                    </h2>
                    {category.logos && category.logos.length > 0 && (
                      <p style={{ 
                        fontSize: '1.1rem', 
                        color: '#4a5568',
                        fontWeight: '500'
                      }}>
                        {category.logos.length} partner institution{category.logos.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Partners Grid */}
                  {category.logos && category.logos.length > 0 ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '30px',
                      maxWidth: '1400px',
                      margin: '0 auto'
                    }}>
                      {category.logos.map((logo, logoIndex) => {
                        console.log('Rendering logo:', logo.name, logo.imageUrl);
                        return (
                          <div 
                            key={logoIndex} 
                            style={{
                              background: 'white',
                              border: '2px solid #e2e8f0',
                              borderRadius: '12px',
                              padding: '30px 20px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '140px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s'
                            }}
                          >
                            <div style={{
                              width: '100%',
                              height: '100px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img 
                                src={logo.imageUrl} 
                                alt={logo.name || 'Partner logo'} 
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100px',
                                  width: 'auto',
                                  height: 'auto',
                                  objectFit: 'contain',
                                  display: 'block'
                                }}
                                onLoad={(e) => {
                                  console.log('✓ Image loaded:', logo.name);
                                }}
                                onError={(e) => {
                                  console.error('✗ Image failed:', logo.name, logo.imageUrl);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#718096' }}>
                      No logos added to this category yet.
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* Admission Journey Section */}
      <section style={{ 
        background: '#ffffff', 
        padding: '100px 20px',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1a202c',
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            Your Admission Journey - Simple & Transparent
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {/* Step 1 */}
            <div style={{
              background: '#f7fafc',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1E3A8A',
                marginBottom: '20px'
              }}>
                01.
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '15px'
              }}>
                Free Counselling
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Talk to our expert advisors to understand your goals, career options that match your interests.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: '#f7fafc',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1E3A8A',
                marginBottom: '20px'
              }}>
                02.
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '15px'
              }}>
                Course & College Selection
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Based on our insight we create a customize roadmap tailored to your needs.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: '#f7fafc',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1E3A8A',
                marginBottom: '20px'
              }}>
                03.
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '15px'
              }}>
                Documentation Support
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Our team guides you through application forms, paperwork, and verification to avoid errors or delays.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{
              background: '#f7fafc',
              padding: '40px 30px',
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1E3A8A',
                marginBottom: '20px'
              }}>
                04.
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '15px'
              }}>
                Admission Confirmed
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Once everything is approved, your seat is secured and you're ready to start your academic journey.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              Ready to start your admission journey? <span style={{ fontWeight: '600', color: '#1a202c' }}>Get Expert Guidance Today</span>
            </p>
            <a 
              href="/contact" 
              className="btn btn-accent btn-lg"
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
            >
              Apply Now →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AcademicPartners;
