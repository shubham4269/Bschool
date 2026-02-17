import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useApplyModal } from '../context/ApplyModalContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

function CoursePage({ config }) {
    const { openModal } = useApplyModal();
    const scrollRef = useScrollAnimation();
    const {
        title,
        subtitle,
        cardBackgroundImage,
        heroBackgroundImage,
        icon,
        overview,
        eligibility,
        highlights,
        curriculum,
        sidebarInfo,
        whyChoose,
        courseSlug,
    } = config;

    return (
        <div ref={scrollRef}>
            <PageHero
                title={title}
                subtitle={subtitle}
                breadcrumb={[{ label: 'Programs', path: '/' }, { label: title }]}
                backgroundImage={cardBackgroundImage}
            />

            <section className="section" style={{ background: 'white' }}>
                <div className="container">
                    <div className="course-info-grid">
                        {/* Main Content */}
                        <div className="course-main">
                            {/* Overview */}
                            <div className="course-section" data-animate="fade-up" id="course-overview">
                                <h2>Program Overview</h2>
                                {overview.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            {/* Eligibility */}
                            <div className="course-section" data-animate="fade-up" data-delay="100" id="course-eligibility">
                                <h2>Eligibility Criteria</h2>
                                <ul>
                                    {eligibility.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Key Highlights */}
                            <div className="course-section" data-animate="fade-up" data-delay="200" id="course-highlights">
                                <h2>Key Highlights</h2>
                                <div className="features-grid" style={{ marginTop: '20px' }}>
                                    {highlights.map((h, i) => (
                                        <div key={i} className="card-tilt" data-animate="zoom-in" data-delay={300 + i * 80} style={{
                                            background: 'var(--gray-50)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: '24px',
                                            display: 'flex',
                                            gap: '14px',
                                            alignItems: 'flex-start',
                                        }}>
                                            <div style={{
                                                width: '44px', height: '44px',
                                                background: 'var(--gradient-primary)',
                                                borderRadius: 'var(--radius-sm)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.2rem', flexShrink: 0,
                                            }}>
                                                {h.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '4px', color: 'var(--gray-800)' }}>
                                                    {h.title}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', lineHeight: '1.6' }}>
                                                    {h.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Curriculum */}
                            {curriculum && (
                                <div className="course-section" data-animate="fade-up" data-delay="300" id="course-curriculum">
                                    <h2>Curriculum & Specializations</h2>
                                    <ul>
                                        {curriculum.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Why Choose */}
                            {whyChoose && (
                                <div className="course-section" data-animate="fade-up" data-delay="400" id="course-why">
                                    <h2>Why Choose This Program?</h2>
                                    <ul>
                                        {whyChoose.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="course-sidebar">
                            <div className="sidebar-card" data-animate="fade-left" data-delay="200">
                                <div className="sidebar-card-header" style={{ 
                                    background: heroBackgroundImage 
                                        ? `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url(${heroBackgroundImage})` 
                                        : 'var(--gradient-primary)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    minHeight: '180px'
                                }}>
                                    {!heroBackgroundImage && (
                                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{icon}</div>
                                    )}
                                    <h3>{title}</h3>
                                </div>
                                <div className="sidebar-card-body">
                                    <div className="sidebar-info-list">
                                        {sidebarInfo.map((info, i) => (
                                            <div key={i} className="sidebar-info-item">
                                                <div className="sidebar-info-icon">{info.icon}</div>
                                                <div>
                                                    <div className="sidebar-info-label">{info.label}</div>
                                                    <div className="sidebar-info-value">{info.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <button onClick={() => openModal(courseSlug || '')} className="btn btn-primary btn-glow" style={{ width: '100%' }} id="sidebar-apply-btn">
                                            Apply Now →
                                        </button>
                                        <button onClick={() => openModal(courseSlug || '')} className="btn btn-secondary" style={{ width: '100%' }} id="sidebar-enquiry-btn">
                                            Free Counseling
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card" data-animate="fade-left" data-delay="400">
                                <div className="sidebar-card-body" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Need Help?</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '12px' }}>
                                        Talk to our expert counselors
                                    </p>
                                    <a href="tel:+919876543210" style={{
                                        fontWeight: '700', color: 'var(--primary-600)',
                                        fontSize: '1.1rem',
                                    }}>
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-content" data-animate="scale-in">
                    <h2 className="cta-title">Ready to Apply for {title}?</h2>
                    <p className="cta-text">
                        Get personalized guidance from our expert counselors. Free profile evaluation and admission support.
                    </p>
                    <div className="cta-buttons">
                        <button onClick={() => openModal(courseSlug || '')} className="btn btn-accent btn-lg btn-glow" id="course-cta-apply">
                            Start Application →
                        </button>
                        <Link to="/" className="btn btn-outline-white btn-lg" id="course-cta-explore">
                            Explore All Programs
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CoursePage;
