import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApplyModal } from '../context/ApplyModalContext';

const courseLinks = [
  { path: '/mba-admission', label: 'MBA Admission', icon: '🎓', desc: 'Full-time MBA programs' },
  { path: '/pgdm-admission', label: 'PGDM Admission', icon: '📋', desc: 'Post Graduate Diploma' },
  { path: '/mba-without-cat', label: 'MBA Without CAT', icon: '🚀', desc: 'Alternative entrance paths' },
  { path: '/direct-mba-admission', label: 'Direct MBA Admission', icon: '⚡', desc: 'Fast-track admission' },
  { path: '/executive-mba', label: 'Executive MBA', icon: '💼', desc: 'For working professionals' },
  { path: '/distance-online-mba', label: 'Distance / Online MBA', icon: '🌐', desc: 'Learn from anywhere' },
];

const specializationLinks = [
  { path: '/mba-marketing', label: 'MBA Marketing', icon: '📢', desc: 'Brand & digital strategy' },
  { path: '/mba-finance', label: 'MBA Finance', icon: '💹', desc: 'Investment & corporate finance' },
  { path: '/mba-hr', label: 'MBA HR', icon: '👥', desc: 'People & talent management' },
  { path: '/mba-business-analytics', label: 'MBA Business Analytics', icon: '📊', desc: 'Data-driven decisions' },
  { path: '/mba-operations', label: 'MBA Operations', icon: '⚙️', desc: 'Supply chain & logistics' },
  { path: '/mba-digital-marketing', label: 'MBA Digital Marketing', icon: '📱', desc: 'SEO, SEM & social media' },
  { path: '/mba-international-business', label: 'MBA International Business', icon: '🌍', desc: 'Global trade & strategy' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`} id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" id="logo-link">
          <div className="navbar-logo-icon">B</div>
          <div className="navbar-logo-text">
            Bschool<span>Bridge</span>
          </div>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`} id="nav-home">
            Home
          </Link>
          <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`} id="nav-about">
            About Us
          </Link>

          <div className={`navbar-dropdown ${dropdownOpen ? 'mobile-open' : ''}`}>
            <button
              className="navbar-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              id="nav-courses-dropdown"
            >
              Courses
              <span className="navbar-dropdown-arrow">▼</span>
            </button>
            <div className="navbar-dropdown-menu">
              <div className="navbar-dropdown-section-label">Programs</div>
              {courseLinks.map((course) => (
                <Link
                  key={course.path}
                  to={course.path}
                  className="navbar-dropdown-item"
                  id={`nav-${course.path.slice(1)}`}
                >
                  <div className="navbar-dropdown-item-icon">{course.icon}</div>
                  <div>
                    <div className="navbar-dropdown-item-text">{course.label}</div>
                    <div className="navbar-dropdown-item-desc">{course.desc}</div>
                  </div>
                </Link>
              ))}
              <div className="navbar-dropdown-divider"></div>
              <div className="navbar-dropdown-section-label">Specializations</div>
              {specializationLinks.map((spec) => (
                <Link
                  key={spec.path}
                  to={spec.path}
                  className="navbar-dropdown-item"
                  id={`nav-${spec.path.slice(1)}`}
                >
                  <div className="navbar-dropdown-item-icon">{spec.icon}</div>
                  <div>
                    <div className="navbar-dropdown-item-text">{spec.label}</div>
                    <div className="navbar-dropdown-item-desc">{spec.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`} id="nav-contact">
            Contact Us
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
