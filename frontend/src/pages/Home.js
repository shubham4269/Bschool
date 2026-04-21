import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApplyModal } from '../context/ApplyModalContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import CountUp from '../components/CountUp';
import HeroSlider from '../components/HeroSlider';
import CollegeLogoStrip from '../components/CollegeLogoStrip';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const testimonials = [
    {
        text: '"Bschool Bridge guided me through the entire MBA admission process. Their expert counselors helped me get into IIM Lucknow despite my average CAT score!"',
        name: 'Priya Sharma',
        role: 'IIM Lucknow, Batch 2025',
        initials: 'PS',
    },
    {
        text: '"Thanks to their direct admission guidance, I secured a seat at XLRI without the stress of waiting for multiple rounds of selections."',
        name: 'Rahul Menon',
        role: 'XLRI Jamshedpur, Batch 2025',
        initials: 'RM',
    },
    {
        text: '"The online MBA counseling was superb. They helped me balance my corporate job while pursuing an executive MBA from a top B-school."',
        name: 'Ananya Desai',
        role: 'ISB Hyderabad, Batch 2024',
        initials: 'AD',
    },
    {
        text: '"From profile building to interview preparation, Bschool Bridge provided comprehensive support. I got admission to FMS Delhi with their strategic guidance!"',
        name: 'Vikash Kumar',
        role: 'FMS Delhi, Batch 2025',
        initials: 'VK',
    },
];

function Home() {
    const { openModal } = useApplyModal();
    const [services, setServices] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [heroImages, setHeroImages] = useState([]);
    const scrollRef = useScrollAnimation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, specsRes, heroRes] = await Promise.all([
                    fetch(`${API_URL}/api/services`),
                    fetch(`${API_URL}/api/specializations`),
                    fetch(`${API_URL}/api/settings/hero-images`),
                ]);
                const servicesData = await servicesRes.json();
                const specsData = await specsRes.json();
                const heroData = await heroRes.json();

                if (servicesData.success) setServices(servicesData.services);
                if (specsData.success) setSpecializations(specsData.specializations);
                if (heroData.success) setHeroImages(heroData.images);
            } catch (err) {
                console.error('Failed to fetch programs:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div ref={scrollRef}>
            {/* ===== HERO SECTION ===== */}
            <section className="hero" id="home-hero" style={{ position: 'relative' }}>
                <HeroSlider images={heroImages} />
                <div className="hero-content">
                    <div className="hero-text-side">
                        <div className="hero-badge fade-in">
                            <span className="hero-badge-dot"></span>
                            Trusted by 15,000+ Students
                        </div>
                        <h1 className="hero-title fade-in fade-in-delay-1">
                            Your Gateway to <span className="highlight">Top Business Schools</span> in India
                        </h1>
                        <p className="hero-description fade-in fade-in-delay-2">
                            Expert guidance for MBA, PGDM & Executive programs. We've helped thousands of students get admitted to leading B-schools including IIMs, XLRI, ISB & more.
                        </p>
                        <div className="hero-buttons fade-in fade-in-delay-3">
                            <button onClick={() => openModal()} className="btn btn-primary btn-lg" id="hero-apply-btn">
                                Apply Now →
                            </button>
                            <Link to="/about" className="btn btn-secondary btn-lg" id="hero-learn-btn">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Full-Width Premium Trust Bar */}
                <div className="hero-features-wrapper fade-in fade-in-delay-4">
                    <div className="hero-features">
                        <div className="hero-feature-item">
                            <span className="hero-feature-icon">✓</span>
                            <span>Verified Colleges & Universities</span>
                        </div>
                        <div className="hero-feature-item">
                            <span className="hero-feature-icon">✓</span>
                            <span>Transparent Admission Process</span>
                        </div>
                        <div className="hero-feature-item">
                            <span className="hero-feature-icon">✓</span>
                            <span>Bihar Student Credit Card Support</span>
                        </div>
                        <div className="hero-feature-item">
                            <span className="hero-feature-icon">✓</span>
                            <span>Career-Focused Counselling</span>
                        </div>
                        <div className="hero-feature-item">
                            <span className="hero-feature-icon">✓</span>
                            <span>End-to-End Admission Assistance</span>
                        </div>
                    </div>
                </div>
                
                {/* Auto-scrolling Logo Strip inside hero at bottom */}
                <div className="hero-logo-strip-wrapper">
                    <CollegeLogoStrip isHeroStrip={true} />
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="stats-bar" id="home-stats">
                <div className="stats-bar-inner">
                    {[
                        { end: 15000, suffix: '+', label: 'Students Enrolled' },
                        { end: 200, suffix: '+', label: 'Partner B-Schools' },
                        { end: 50, suffix: '+', label: 'Cities Covered' },
                        { end: 12, suffix: '+', label: 'Years Experience' },
                    ].map((stat, i) => (
                        <div className="stat-item" data-animate="fade-up" data-delay={i * 100} key={stat.label}>
                            <div className="stat-number">
                                <CountUp end={stat.end} duration={2200} /><span>{stat.suffix}</span>
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SERVICES SECTION ===== */}
            <section className="section" id="home-services" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-header" data-animate="fade-up">
                        <div className="section-label">Our Services</div>
                        <h2 className="section-title title-reveal">MBA & Management Services</h2>
                        <p className="section-subtitle">
                            Comprehensive admission services to help you get into the right MBA or management program based on your goals and preferences.
                        </p>
                    </div>

                    <div className="course-grid">
                        {services.map((service, i) => (
                            <Link
                                to={`/service/${service.slug}`}
                                key={service.slug}
                                className="course-card card-tilt"
                                data-animate="zoom-in"
                                data-delay={i * 100}
                                id={`service-card-${service.slug}`}
                            >
                                <div className="course-card-image" style={{
                                    background: service.cardBackgroundImage
                                        ? `url(${service.cardBackgroundImage})`
                                        : 'linear-gradient(to right, #1E3A8A, #20282D)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    minHeight: '200px',
                                    height: '200px'
                                }}>
                                    {!service.cardBackgroundImage && (
                                        <div className="course-card-emoji">{service.icon}</div>
                                    )}
                                    <div className="course-card-badge">{service.badge}</div>
                                </div>
                                <div className="course-card-body">
                                    <h3 className="course-card-title">{service.title}</h3>
                                    <p className="course-card-text">{service.shortDesc}</p>
                                    <div className="course-card-meta">
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">⏱️</span>
                                            {service.duration}
                                        </div>
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">📍</span>
                                            {service.mode}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SPECIALIZATIONS SECTION ===== */}
            <section className="section" id="home-specializations" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="section-header" data-animate="fade-up">
                        <div className="section-label">Specializations</div>
                        <h2 className="section-title title-reveal">MBA Specialization Programs</h2>
                        <p className="section-subtitle">
                            Choose from industry-leading MBA specializations to focus your career in your area of passion and expertise.
                        </p>
                    </div>

                    <div className="course-grid">
                        {specializations.slice(0, 6).map((spec, i) => (
                            <Link
                                to={`/specialization/${spec.slug}`}
                                key={spec.slug}
                                className="course-card card-tilt"
                                data-animate="zoom-in"
                                data-delay={i * 100}
                                id={`spec-card-${spec.slug}`}
                            >
                                <div className="course-card-image" style={{
                                    background: spec.cardBackgroundImage
                                        ? `url(${spec.cardBackgroundImage})`
                                        : 'linear-gradient(to right, #1E3A8A, #20282D)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    minHeight: '200px',
                                    height: '200px'
                                }}>
                                    {!spec.cardBackgroundImage && (
                                        <div className="course-card-emoji">{spec.icon}</div>
                                    )}
                                    <div className="course-card-badge">{spec.badge}</div>
                                </div>
                                <div className="course-card-body">
                                    <h3 className="course-card-title">{spec.title}</h3>
                                    <p className="course-card-text">{spec.shortDesc}</p>
                                    <div className="course-card-meta">
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">⏱️</span>
                                            {spec.duration}
                                        </div>
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">📍</span>
                                            {spec.mode}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== COLLEGE LOGO STRIP ===== */}
            <CollegeLogoStrip />

            {/* ===== WHY CHOOSE US ===== */}
            <section className="section" id="home-features" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-header" data-animate="fade-up">
                        <div className="section-label">Why Choose Us</div>
                        <h2 className="section-title title-reveal">Your Success is Our Mission</h2>
                        <p className="section-subtitle">
                            We go beyond just admissions — we guide you through your entire MBA journey from applying to graduating.
                        </p>
                    </div>

                    <div className="features-grid">
                        {[
                            { icon: '🎯', title: 'Expert Counseling', text: 'One-on-one sessions with MBA counselors who have deep knowledge of every top B-school and their admission processes.' },
                            { icon: '📊', title: 'Profile Evaluation', text: 'Free comprehensive profile assessment to identify the best-fit MBA programs based on your academics, experience, and goals.' },
                            { icon: '📝', title: 'Application Support', text: 'End-to-end assistance with SOPs, LORs, essays, and application forms to maximize your chances of selection.' },
                            { icon: '🗣️', title: 'Interview Prep', text: 'Mock interview sessions with B-school alumni and experts to help you ace PI rounds at top institutions.' },
                            { icon: '💰', title: 'Scholarship Guidance', text: 'Comprehensive information on merit-based and need-based scholarships available at partner institutions.' },
                            { icon: '🤝', title: 'Placement Support', text: 'Access to our network of 500+ corporate partners for internship and placement opportunities post MBA.' },
                        ].map((feature, i) => (
                            <div key={i} className="feature-card card-tilt" data-animate="fade-up" data-delay={i * 100}>
                                <div className="feature-card-icon">{feature.icon}</div>
                                <h3 className="feature-card-title">{feature.title}</h3>
                                <p className="feature-card-text">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section" id="home-testimonials" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="section-header" data-animate="fade-up">
                        <div className="section-label">Testimonials</div>
                        <h2 className="section-title title-reveal">What Our Students Say</h2>
                        <p className="section-subtitle">
                            Hear from students who achieved their MBA dreams with our guidance and support.
                        </p>
                    </div>

                    <div className="features-grid">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="testimonial-card card-tilt" data-animate="fade-up" data-delay={i * 150}>
                                <div className="testimonial-stars">★ ★ ★ ★ ★</div>
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{testimonial.initials}</div>
                                    <div>
                                        <div className="testimonial-name">{testimonial.name}</div>
                                        <div className="testimonial-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta-section" id="home-cta">
                <div className="cta-content" data-animate="scale-in">
                    <h2 className="cta-title">Ready to Start Your MBA Journey?</h2>
                    <p className="cta-text">
                        Get free counseling from our experts and take the first step towards your dream B-school.
                    </p>
                    <div className="cta-buttons">
                        <button onClick={() => openModal()} className="btn btn-accent btn-lg btn-glow" id="cta-apply-btn">
                            Apply Now →
                        </button>
                        <Link to="/about" className="btn btn-outline-white btn-lg" id="cta-learn-btn">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
