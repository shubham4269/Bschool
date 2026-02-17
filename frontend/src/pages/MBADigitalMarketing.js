import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-digital-marketing',
    title: 'MBA in Digital Marketing',
    subtitle: 'Lead the digital revolution with an MBA in Digital Marketing — the most in-demand specialization for the new age of business and consumer engagement.',
    icon: '📱',
    heroBackgroundImage: '',
    overview: [
        'An MBA in Digital Marketing is the fastest-growing specialization in management education, driven by the explosive growth of digital platforms, e-commerce, and online consumer behavior. This program combines traditional marketing strategy with cutting-edge digital skills including SEO, SEM, social media marketing, content strategy, marketing automation, and advanced analytics.',
        'India\'s digital advertising market is growing at 30%+ annually, and every company — from startups to Fortune 500 — is investing heavily in digital transformation. An MBA digital marketing degree prepares you to lead this transformation, whether you\'re managing a brand\'s social media presence, running multi-million dollar performance campaigns, or building a company\'s entire digital strategy.',
        'Top institutions offering MBA digital marketing programs include MICA Ahmedabad, IIM Indore, Symbiosis (SCMC Pune), Mudra Institute, and several AICTE-approved colleges with industry-linked digital marketing curricula. Bschool Bridge helps you find the right MBA digital marketing program based on your career goals, budget, and city preference.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, MAT, MICAT, or university-specific tests',
        'Passion for digital platforms, content creation, and online consumer behavior',
        'Basic understanding of social media and digital tools is advantageous',
        'Google Ads, HubSpot, or Meta certifications can strengthen your application',
    ],
    highlights: [
        { icon: '🔍', title: 'SEO & SEM Mastery', text: 'Master search engine optimization and paid search to drive organic and paid growth.' },
        { icon: '📣', title: 'Social Media Strategy', text: 'Design and execute campaigns across Instagram, LinkedIn, YouTube, and emerging platforms.' },
        { icon: '📧', title: 'Marketing Automation', text: 'Learn HubSpot, Marketo, and Salesforce for automated customer journey management.' },
        { icon: '📈', title: 'Performance Marketing', text: 'Run data-driven Google Ads, Meta Ads, and programmatic campaigns at scale.' },
        { icon: '🎨', title: 'Content Strategy', text: 'Create compelling content strategies for blogs, video, podcasts, and email marketing.' },
        { icon: '🤖', title: 'AI in Marketing', text: 'Leverage AI tools for personalization, chatbots, predictive targeting, and creative generation.' },
    ],
    curriculum: [
        'Digital Marketing Strategy & Planning',
        'Search Engine Optimization (SEO) & Content Marketing',
        'Pay-Per-Click (PPC) & Performance Marketing',
        'Social Media Marketing & Influencer Strategy',
        'Email Marketing & Marketing Automation',
        'Web Analytics, Google Analytics & Data Studio',
        'E-commerce Marketing & Conversion Optimization',
        'AI in Marketing & MarTech Stack Management',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Digital Marketing' },
        { icon: '📍', label: 'Mode', value: 'Full-time / Hybrid' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, MICAT, XAT, MAT' },
        { icon: '💰', label: 'Avg. Package', value: '₹8-25 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'Google, Meta, Dentsu, WPP' },
    ],
    whyChoose: [
        'MBA digital marketing is the fastest-growing specialization with 30%+ annual growth in job openings',
        'Every company needs digital marketing — ensuring you\'re never short of career opportunities',
        'Perfect blend of creativity and technology for those who love both storytelling and analytics',
        'High freelancing and entrepreneurial potential — start your own digital agency after graduation',
        'Constantly evolving field means your career will never be boring — always learning something new',
        'Global demand for digital marketing professionals makes relocation and remote work easy',
    ],
};

function MBADigitalMarketing() {
    return <CoursePage config={config} />;
}

export default MBADigitalMarketing;
