import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer" id="site-footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="navbar-logo">
                        <div className="navbar-logo-icon">B</div>
                        <div className="navbar-logo-text">
                            Bschool<span>Bridge</span>
                        </div>
                    </Link>
                    <p className="footer-brand-text">
                        Your trusted partner for MBA & PGDM admissions across India. We connect aspiring leaders with top business schools to build their future.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="footer-social-link" aria-label="Facebook" id="social-facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="Instagram" id="social-instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="YouTube" id="social-youtube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Quick Links</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link" id="footer-home">Home</Link>
                        <Link to="/about" className="footer-link" id="footer-about">About Us</Link>
                        <Link to="/contact" className="footer-link" id="footer-contact">Contact Us</Link>
                        <Link to="/mba-admission" className="footer-link" id="footer-mba">MBA Admission</Link>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Programs</h4>
                    <div className="footer-links">
                        <Link to="/pgdm-admission" className="footer-link" id="footer-pgdm">PGDM Admission</Link>
                        <Link to="/mba-without-cat" className="footer-link" id="footer-without-cat">MBA Without CAT</Link>
                        <Link to="/direct-mba-admission" className="footer-link" id="footer-direct">Direct MBA Admission</Link>
                        <Link to="/executive-mba" className="footer-link" id="footer-executive">Executive MBA</Link>
                        <Link to="/distance-online-mba" className="footer-link" id="footer-distance">Distance / Online MBA</Link>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Specializations</h4>
                    <div className="footer-links">
                        <Link to="/mba-marketing" className="footer-link" id="footer-marketing">MBA Marketing</Link>
                        <Link to="/mba-finance" className="footer-link" id="footer-finance">MBA Finance</Link>
                        <Link to="/mba-hr" className="footer-link" id="footer-hr">MBA HR</Link>
                        <Link to="/mba-business-analytics" className="footer-link" id="footer-analytics">MBA Business Analytics</Link>
                        <Link to="/mba-operations" className="footer-link" id="footer-operations">MBA Operations</Link>
                        <Link to="/mba-digital-marketing" className="footer-link" id="footer-digital-marketing">MBA Digital Marketing</Link>
                        <Link to="/mba-international-business" className="footer-link" id="footer-intl-business">MBA International Business</Link>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Contact</h4>
                    <div className="footer-links">
                        <span className="footer-link">📍 New Delhi, India</span>
                        <span className="footer-link">📞 +91 98765 43210</span>
                        <span className="footer-link">✉️ info@bschoolbridge.in</span>
                        <span className="footer-link">🕐 Mon-Sat: 9AM - 7PM</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Bschool Bridge. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/privacy-policy" className="footer-link" id="footer-privacy">Privacy Policy</Link>
                    <Link to="/disclaimer" className="footer-link" id="footer-disclaimer">Disclaimer</Link>
                    <Link to="/terms-and-conditions" className="footer-link" id="footer-terms">Terms & Conditions</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
