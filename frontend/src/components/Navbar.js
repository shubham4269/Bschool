import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApplyModal } from '../context/ApplyModalContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [specsDropdownOpen, setSpecsDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const { pathname } = useLocation();
  const { openModal } = useApplyModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
    setSpecsDropdownOpen(false);
  }, [pathname]);

  // Fetch services & specializations from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, specsRes] = await Promise.all([
          fetch(`${API_URL}/api/services`),
          fetch(`${API_URL}/api/specializations`),
        ]);
        const servicesData = await servicesRes.json();
        const specsData = await specsRes.json();

        if (servicesData.success) setServices(servicesData.services);
        if (specsData.success) setSpecializations(specsData.specializations);
      } catch (err) {
        console.error('Failed to fetch nav data:', err);
      }
    };
    fetchData();
  }, []);

  const isActive = (path) => pathname === path;

  const openServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
    setSpecsDropdownOpen(false);
  };

  const openSpecsDropdown = () => {
    setSpecsDropdownOpen(!specsDropdownOpen);
    setServicesDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`} id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" id="logo-link">
          <img
            src="/logo.png"
            alt="BschoolBridge Logo"
            className="navbar-logo-img"
            style={{ height: '55px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`} id="nav-home">
            Home
          </Link>
          <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`} id="nav-about">
            About Us
          </Link>

          {/* Services Dropdown */}
          <div className={`navbar-dropdown ${servicesDropdownOpen ? 'mobile-open' : ''}`}>
            <button
              className="navbar-dropdown-trigger"
              onClick={openServicesDropdown}
              id="nav-services-dropdown"
            >
              Services
              <span className="navbar-dropdown-arrow">▼</span>
            </button>
            <div className="navbar-dropdown-menu">
              {services.length > 0 ? (
                services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/service/${service.slug}`}
                    className="navbar-dropdown-item"
                    id={`nav-service-${service.slug}`}
                  >
                    <div className="navbar-dropdown-item-icon">{service.icon}</div>
                    <div>
                      <div className="navbar-dropdown-item-text">{service.title}</div>
                      <div className="navbar-dropdown-item-desc">{service.navDesc || service.shortDesc}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="navbar-dropdown-item" style={{ opacity: 0.5, cursor: 'default' }}>
                  <div className="navbar-dropdown-item-icon">⏳</div>
                  <div><div className="navbar-dropdown-item-text">Loading...</div></div>
                </div>
              )}
            </div>
          </div>

          {/* Specializations Dropdown */}
          <div className={`navbar-dropdown ${specsDropdownOpen ? 'mobile-open' : ''}`}>
            <button
              className="navbar-dropdown-trigger"
              onClick={openSpecsDropdown}
              id="nav-specs-dropdown"
            >
              Specializations
              <span className="navbar-dropdown-arrow">▼</span>
            </button>
            <div className="navbar-dropdown-menu">
              {specializations.length > 0 ? (
                specializations.map((spec) => (
                  <Link
                    key={spec.slug}
                    to={`/specialization/${spec.slug}`}
                    className="navbar-dropdown-item"
                    id={`nav-spec-${spec.slug}`}
                  >
                    <div className="navbar-dropdown-item-icon">{spec.icon}</div>
                    <div>
                      <div className="navbar-dropdown-item-text">{spec.title}</div>
                      <div className="navbar-dropdown-item-desc">{spec.navDesc || spec.shortDesc}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="navbar-dropdown-item" style={{ opacity: 0.5, cursor: 'default' }}>
                  <div className="navbar-dropdown-item-icon">⏳</div>
                  <div><div className="navbar-dropdown-item-text">Loading...</div></div>
                </div>
              )}
            </div>
          </div>

          <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`} id="nav-contact">
            Contact Us
          </Link>

          <Link to="/academic-partners" className={`navbar-link ${isActive('/academic-partners') ? 'active' : ''}`} id="nav-partners">
            Academic Partners
          </Link>

          <Link to="/the-latest" className={`navbar-link ${isActive('/the-latest') ? 'active' : ''}`} id="nav-blog">
            Blog
          </Link>

          <button onClick={() => { openModal(); setMobileOpen(false); }} className="btn btn-accent btn-sm navbar-cta" id="nav-cta">
            Apply Now
          </button>
        </div>

        <button
          className={`navbar-mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          id="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
