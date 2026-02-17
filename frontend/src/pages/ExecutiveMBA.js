import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'executive-mba',
    title: 'Executive MBA',
    subtitle: 'Accelerate your career with Executive MBA programs designed for working professionals — study on weekends while you continue working.',
    icon: '💼',
    heroBackgroundImage: '',
    overview: [
        'The Executive MBA (EMBA) is a premium management program specifically designed for mid-career professionals who want to advance to senior leadership positions without leaving their jobs. It combines rigorous academic learning with practical business application.',
        'Executive MBA programs offer flexible scheduling — weekend classes, evening sessions, or intensive module-based formats — so that professionals can balance work, studies, and personal life effectively.',
        'Bschool Bridge connects experienced professionals with India\'s top Executive MBA programs at institutions like ISB, IIMs, XLRI, and Great Lakes, ensuring you find the perfect program for your career stage and aspirations.',
    ],
    eligibility: [
        'Bachelor\'s degree from a recognized university with minimum 50% marks',
        'Minimum 3-5 years of full-time professional work experience (varies by institution)',
        'Currently employed professionals preferred by most Executive MBA programs',
        'GMAT/GRE scores may be required for top-tier programs (ISB, IIMs)',
        'Strong professional track record with demonstrated career progression',
        'Employer sponsorship or self-financing capability',
    ],
    highlights: [
        { icon: '📅', title: 'Weekend Classes', text: 'Study on weekends or in intensive module format without leaving your job.' },
        { icon: '🏢', title: 'Peer Network', text: 'Learn alongside experienced professionals from diverse industries and functions.' },
        { icon: '📈', title: 'Career Growth', text: 'Average 60% salary increase within 2 years of completing Executive MBA.' },
        { icon: '🌐', title: 'Global Modules', text: 'International immersion modules at partner universities in USA, Europe, and Asia.' },
        { icon: '👨‍🏫', title: 'Senior Faculty', text: 'Learn from world-class faculty with corporate consulting experience.' },
        { icon: '🤝', title: 'C-Suite Access', text: 'Networking opportunities with CEOs, founders, and industry leaders.' },
    ],
    curriculum: [
        'Strategic Leadership & Change Management',
        'Corporate Strategy & Competitive Advantage',
        'Advanced Financial Management & Valuation',
        'Digital Transformation & Technology Management',
        'Global Business Strategy & International Markets',
        'Mergers, Acquisitions & Corporate Restructuring',
        'Innovation Management & Design Thinking',
        'Executive Communication & Negotiation',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '1-2 Years' },
        { icon: '📋', label: 'Degree Type', value: 'Executive MBA / PGPX' },
        { icon: '📍', label: 'Mode', value: 'Weekend / Modular' },
        { icon: '📝', label: 'Experience Required', value: '3-5+ Years' },
        { icon: '💰', label: 'Fee Range', value: '₹15L - ₹40L (Varies)' },
        { icon: '🎯', label: 'Salary Hike', value: '40-80% Average' },
    ],
    whyChoose: [
        'Continue earning your salary while pursuing a world-class MBA education',
        'Immediate application of classroom learnings to your current job responsibilities',
        'Build an elite network of experienced professionals across industries',
        'Strong ROI — Executive MBA graduates see the fastest salary progression',
        'Employer-sponsored options available at many partner institutions',
        'Globally recognized credentials that open doors to CXO-level positions',
    ],
};

function ExecutiveMBA() {
    return <CoursePage config={config} />;
}

export default ExecutiveMBA;
