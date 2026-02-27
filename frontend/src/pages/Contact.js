import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import useScrollAnimation from '../hooks/useScrollAnimation';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Contact() {
    const scrollRef = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', course: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={scrollRef}>
            <PageHero
                title="Contact Us"
                subtitle="Have questions about MBA admissions? Our expert counselors are here to help you every step of the way."
                breadcrumb={[{ label: 'Contact Us' }]}
            />

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="section" style={{ background: 'white', paddingBottom: '40px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {[
                            { icon: '📍', title: 'Visit Us', text: 'Connaught Place, New Delhi, India - 110001' },
                            { icon: '📞', title: 'Call Us', text: '+91 98765 43210\n+91 11 4567 8900' },
                            { icon: '✉️', title: 'Email Us', text: 'info@bschoolbridge.in\nadmissions@bschoolbridge.in' },
                            { icon: '🕐', title: 'Office Hours', text: 'Mon - Sat: 9:00 AM - 7:00 PM\nSunday: Closed' },
                        ].map((info, i) => (
                            <div key={i} className="contact-info-card card-tilt" data-animate="fade-up" data-delay={i * 100}>
                                <div className="contact-info-icon">{info.icon}</div>
                                <div>
                                    <h4 className="contact-info-title">{info.title}</h4>
                                    <p className="contact-info-text" style={{ whiteSpace: 'pre-line' }}>{info.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM ===== */}
            <section className="section" id="contact-form-section" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="contact-grid">
                        <div data-animate="fade-right">
                            <div className="section-label">Get In Touch</div>
                            <h2 className="section-title title-reveal" style={{ marginBottom: '20px' }}>Send Us a Message</h2>
                            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
                                Fill out the form below and our admission counselors will get back to you within 24 hours with personalized guidance.
                            </p>

                            {submitted && (
                                <div style={{
                                    background: 'var(--primary-50)',
                                    border: '1px solid var(--primary-200)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '16px 20px',
                                    color: 'var(--primary-700)',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    marginBottom: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}>
                                    ✅ Thank you! Your message has been sent successfully. We'll contact you shortly.
                                </div>
                            )}

                            {error && (
                                <div style={{
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '16px 20px',
                                    color: '#991b1b',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    marginBottom: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}>
                                    ❌ {error}
                                </div>
                            )}

                            <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-name">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            id="contact-name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-email">Email Address *</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            id="contact-email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            id="contact-phone"
                                            name="phone"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contact-course">Interested Program</label>
                                        <select
                                            className="form-select"
                                            id="contact-course"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a program</option>
                                            <option value="mba">MBA Admission</option>
                                            <option value="pgdm">PGDM Admission</option>
                                            <option value="mba-without-cat">MBA Without CAT</option>
                                            <option value="direct-mba">Direct MBA Admission</option>
                                            <option value="executive-mba">Executive MBA</option>
                                            <option value="distance-mba">Distance / Online MBA</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-message">Your Message</label>
                                    <textarea
                                        className="form-textarea"
                                        id="contact-message"
                                        name="message"
                                        placeholder="Tell us about your academic background, work experience, and what you're looking for..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg btn-glow" id="contact-submit" style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                                    {loading ? '⏳ Sending...' : 'Send Message →'}
                                </button>
                            </form>
                        </div>

                        <div data-animate="fade-left" data-delay="200">
                            <div style={{
                                background: 'var(--gradient-hero)',
                                borderRadius: 'var(--radius-xl)',
                                padding: '48px 36px',
                                color: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '32px',
                            }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', color: 'white' }}>
                                    Why Students Choose Bschool Bridge
                                </h3>

                                {[
                                    { icon: '🎯', title: 'Free Counseling', desc: 'Get personalized advice from MBA experts at zero cost.' },
                                    { icon: '⚡', title: 'Quick Response', desc: 'We respond to all queries within 24 hours guaranteed.' },
                                    { icon: '🏆', title: 'Proven Results', desc: '15,000+ students admitted to top B-schools.' },
                                    { icon: '🔒', title: 'Confidential', desc: 'Your information is 100% secure and never shared.' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)',
                                            borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0,
                                            border: '1px solid rgba(255,255,255,0.15)',
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '4px' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
