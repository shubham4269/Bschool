import React from 'react';
import { Link } from 'react-router-dom';
import { useApplyModal } from '../context/ApplyModalContext';

const courses = [
    {
        path: '/mba-admission',
        title: 'MBA Admission',
        icon: '🎓',
        badge: 'Popular',
        desc: 'Get admitted to top MBA colleges across India with expert guidance on entrance exams, applications, and interviews.',
        duration: '2 Years',
        mode: 'Full-time',
        gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    },
    {
        path: '/pgdm-admission',
        title: 'PGDM Admission',
        icon: '📋',
        badge: 'AICTE Approved',
        desc: 'Post Graduate Diploma in Management from AICTE-approved institutions with industry-aligned curriculum.',
        duration: '2 Years',
        mode: 'Full-time',
        gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    },
    {
        path: '/mba-without-cat',
        title: 'MBA Without CAT',
        icon: '🚀',
        badge: 'No CAT Score',
        desc: 'Explore top MBA colleges that accept MAT, XAT, ATMA, CMAT and other entrance exams beyond CAT.',
        duration: '2 Years',
        mode: 'Full-time',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
        path: '/direct-mba-admission',
        title: 'Direct MBA Admission',
        icon: '⚡',
        badge: 'Fast Track',
        desc: 'Secure direct admission in management programs based on merit, work experience, and academic performance.',
        duration: '2 Years',
        mode: 'Full-time',
        gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
    },
    {
        path: '/executive-mba',
        title: 'Executive MBA',
        icon: '💼',
        badge: 'For Professionals',
        desc: 'Advance your career with weekend and part-time MBA programs designed for working professionals.',
        duration: '1-2 Years',
        mode: 'Part-time',
        gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    },
    {
        path: '/distance-online-mba',
        title: 'Distance / Online MBA',
        icon: '🌐',
        badge: 'UGC Approved',
        desc: 'Study from anywhere with UGC-recognized distance and online MBA programs from top universities.',
        duration: '2 Years',
        mode: 'Online',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
];

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
];

function Home() {
    const { openModal } = useApplyModal();
    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="hero" id="home-hero">
                <div className="hero-content">
                    <div className="hero-text-side">
                        <div className="hero-badge fade-in">
                            <span className="hero-badge-dot"></span>
                            Admissions Open 2026-27
                        </div>
                        <h1 className="hero-title fade-in fade-in-delay-1">
                            Your Gateway to <span className="highlight">Top Business Schools</span> in India
                        </h1>
                        <p className="hero-description fade-in fade-in-delay-2">
                            Expert guidance for MBA, PGDM & Executive programs. We've helped 15,000+ students get admitted to leading B-schools including IIMs, XLRI, ISB & more.
                        </p>
                        <div className="hero-buttons fade-in fade-in-delay-3">
                            <button onClick={() => openModal()} className="btn btn-accent btn-lg" id="hero-apply-btn">
                                Apply Now →
                            </button>
                            <Link to="/about" className="btn btn-outline-white btn-lg" id="hero-learn-btn">
                                Learn More
                            </Link>
                        </div>
                        <div className="hero-stats fade-in fade-in-delay-4">
                            <div>
                                <div className="hero-stat-value">15K<span>+</span></div>
                                <div className="hero-stat-label">Students Placed</div>
                            </div>
                            <div>
                                <div className="hero-stat-value">200<span>+</span></div>
                                <div className="hero-stat-label">Partner Colleges</div>
                            </div>
                            <div>
                                <div className="hero-stat-value">98<span>%</span></div>
                                <div className="hero-stat-label">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual fade-in fade-in-delay-2">
                        <div className="hero-image-wrapper">
                            <div className="hero-image-card">
                                <div className="hero-image-inner">
                                    <div className="hero-image-icon">🎓</div>
                                    <div className="hero-image-title">Shape Your Future</div>
                                    <div className="hero-image-text">Join India's #1 MBA Admission Platform</div>
                                </div>
                            </div>
                            <div className="hero-float hero-float-1">
                                <div className="hero-float-icon" style={{ background: 'rgba(79,70,229,0.1)' }}>🏆</div>
                                <div>
                                    <div className="hero-float-text">Top Ranked</div>
                                    <div className="hero-float-subtext">Among Admission Portals</div>
                                </div>
                            </div>
                            <div className="hero-float hero-float-2">
                                <div className="hero-float-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>✅</div>
                                <div>
                                    <div className="hero-float-text">98% Placement</div>
                                    <div className="hero-float-subtext">Across Partner Colleges</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="stats-bar" id="home-stats">
                <div className="stats-bar-inner">
                    <div className="stat-item fade-in">
                        <div className="stat-number">15,000<span>+</span></div>
                        <div className="stat-label">Students Enrolled</div>
                    </div>
                    <div className="stat-item fade-in fade-in-delay-1">
                        <div className="stat-number">200<span>+</span></div>
                        <div className="stat-label">Partner B-Schools</div>
                    </div>
                    <div className="stat-item fade-in fade-in-delay-2">
                        <div className="stat-number">50<span>+</span></div>
                        <div className="stat-label">Cities Covered</div>
                    </div>
                    <div className="stat-item fade-in fade-in-delay-3">
                        <div className="stat-number">12<span>+</span></div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                </div>
            </section>

            {/* ===== COURSES SECTION ===== */}
            <section className="section" id="home-courses" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Our Programs</div>
                        <h2 className="section-title">Explore MBA & Management Programs</h2>
                        <p className="section-subtitle">
                            Choose from a wide range of management programs tailored to your career goals, schedule, and academic background.
                        </p>
                    </div>

                    <div className="course-grid">
                        {courses.map((course, i) => (
                            <Link to={course.path} key={course.path} className="course-card fade-in" style={{ animationDelay: `${i * 0.1}s` }} id={`course-card-${course.path.slice(1)}`}>
                                <div className="course-card-image" style={{ background: course.gradient }}>
                                    <div className="course-card-emoji">{course.icon}</div>
                                    <div className="course-card-badge">{course.badge}</div>
                                </div>
                                <div className="course-card-body">
                                    <h3 className="course-card-title">{course.title}</h3>
                                    <p className="course-card-text">{course.desc}</p>
                                    <div className="course-card-meta">
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">⏱️</span>
                                            {course.duration}
                                        </div>
                                        <div className="course-card-meta-item">
                                            <span className="course-card-meta-icon">📍</span>
                                            {course.mode}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="section" id="home-features" style={{ background: 'var(--gray-50)' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Why Choose Us</div>
                        <h2 className="section-title">Your Success is Our Mission</h2>
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
                            <div key={i} className="feature-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="feature-card-icon">{feature.icon}</div>
                                <h3 className="feature-card-title">{feature.title}</h3>
                                <p className="feature-card-text">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section" id="home-testimonials" style={{ background: 'white' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Testimonials</div>
                        <h2 className="section-title">What Our Students Say</h2>
                        <p className="section-subtitle">
                            Hear from students who achieved their MBA dreams with our guidance and support.
                        </p>
                    </div>

                    <div className="features-grid">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="testimonial-card fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
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
                <div className="cta-content fade-in">
                    <h2 className="cta-title">Ready to Start Your MBA Journey?</h2>
                    <p className="cta-text">
                        Get free counseling from our experts and take the first step towards your dream B-school. Applications for 2026-27 are now open.
                    </p>
                    <div className="cta-buttons">
                        <button onClick={() => openModal()} className="btn btn-accent btn-lg" id="cta-apply-btn">
                            Apply Now →
                        </button>
                        <Link to="/about" className="btn btn-outline-white btn-lg" id="cta-learn-btn">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
