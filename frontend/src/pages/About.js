import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import useScrollAnimation from '../hooks/useScrollAnimation';
import CountUp from '../components/CountUp';

function About() {
    const scrollRef = useScrollAnimation();

    return (
        <div ref={scrollRef}>
            <PageHero
                title="About Bschool Bridge"
                subtitle="Empowering future business leaders with the right guidance, connections, and resources since 2014."
                breadcrumb={[{ label: 'About Us' }]}
            />

            {/* ===== MISSION & VISION ===== */}
            <section className="section" id="about-mission" style={{ background: 'white' }}>
                <div className="container">
                    <div className="about-content-section">
                        <div className="about-image-container" data-animate="fade-right">
                            <img src="/about.webp" alt="About Bschool Bridge" className="about-image" />
                        </div>
                        <div className="about-text" data-animate="fade-left" data-delay="200">
                            <div className="section-label">Who We Are</div>
                            <h3>Transforming MBA Admissions Since 2014</h3>
                            <p>
                                Bschool Bridge was founded with a singular vision — to democratize access to quality management education in India. We believe every aspiring business leader deserves a fair shot at their dream B-school, regardless of their background.
                            </p>
                            <p>
                                Over the past 12 years, we have grown from a small advisory firm in Delhi to India's most trusted MBA admission consultancy, partnering with 200+ B-schools nationwide.
                            </p>
                            <div className="about-list">
                                {[
                                    '15,000+ students successfully admitted',
                                    '200+ partner business schools',
                                    '50+ cities across India covered',
                                    '98% student satisfaction rate',
                                ].map((item, i) => (
                                    <div className="about-list-item" data-animate="fade-up" data-delay={300 + i * 100} key={i}>
                                        <div className="about-list-icon">✓</div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="section" id="about-values" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="section-header" data-animate="fade-up">
                        <div className="section-label">Our Values</div>
                        <h2 className="section-title title-reveal">What Drives Us</h2>
                        <p className="section-subtitle">
                            Our core values shape everything we do — from how we counsel students to how we partner with institutions.
                        </p>
                    </div>

                    <div className="features-grid">
                        {[
                            { icon: '🌟', title: 'Student First', text: 'Every decision we make is centered around what is best for the student. Your aspirations guide our recommendations.' },
                            { icon: '🔍', title: 'Transparency', text: 'We provide honest, unbiased information about colleges, fees, placements, and ROI so you can make informed decisions.' },
                            { icon: '🏅', title: 'Excellence', text: 'We partner only with accredited, quality institutions and maintain the highest standards in our counseling services.' },
                            { icon: '🤗', title: 'Inclusivity', text: 'We believe talent has no boundaries. Our services are accessible to students from all socio-economic backgrounds.' },
                            { icon: '🔧', title: 'Innovation', text: 'We leverage technology and data analytics to provide personalized program recommendations and career insights.' },
                            { icon: '🤝', title: 'Integrity', text: 'We never mislead students with false promises. Every claim we make is backed by verifiable data and real outcomes.' },
                        ].map((value, i) => (
                            <div key={i} className="feature-card card-tilt" data-animate="fade-up" data-delay={i * 100}>
                                <div className="feature-card-icon">{value.icon}</div>
                                <h3 className="feature-card-title">{value.title}</h3>
                                <p className="feature-card-text">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR PROCESS ===== */}
            <section className="section" id="about-process" style={{ background: 'white' }}>
                <div className="container">
                    <div className="about-content-section reverse">
                        <div className="about-image-container" data-animate="fade-left">
                            <img src="/process.webp" alt="Our Process" className="about-image" />
                        </div>
                        <div className="about-text" data-animate="fade-right" data-delay="200">
                            <div className="section-label">How We Work</div>
                            <h3>A Proven 4-Step Admission Process</h3>
                            <p>
                                Our structured approach has been refined over 12 years and thousands of successful admissions. We leave nothing to chance.
                            </p>
                            <div className="about-list">
                                {[
                                    { num: '1', label: 'Profile Assessment', desc: '— Free comprehensive evaluation of your profile' },
                                    { num: '2', label: 'College Shortlisting', desc: '— Curated list of best-fit B-schools' },
                                    { num: '3', label: 'Application & Prep', desc: '— SOP, LOR, form filling, and interview coaching' },
                                    { num: '4', label: 'Admission & Beyond', desc: '— Securing your seat and ongoing career support' },
                                ].map((step, i) => (
                                    <div className="about-list-item" data-animate="fade-up" data-delay={300 + i * 100} key={i}>
                                        <div className="about-list-icon" style={{ background: 'var(--accent-100)', color: 'var(--accent-600)' }}>{step.num}</div>
                                        <strong>{step.label}</strong> {step.desc}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="stats-bar" id="about-stats">
                <div className="stats-bar-inner">
                    {[
                        { end: 12, suffix: '+', label: 'Years of Excellence' },
                        { end: 15000, suffix: '+', label: 'Students Guided' },
                        { end: 200, suffix: '+', label: 'B-School Partners' },
                        { end: 50, suffix: '+', label: 'Cities Covered' },
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

            {/* ===== CTA ===== */}
            <section className="cta-section" id="about-cta">
                <div className="cta-content" data-animate="scale-in">
                    <h2 className="cta-title">Want to Know More About Us?</h2>
                    <p className="cta-text">
                        Reach out to our team for a free counseling session. Let us help you find the perfect management program.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn btn-accent btn-lg btn-glow" id="about-cta-contact">
                            Get In Touch →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
