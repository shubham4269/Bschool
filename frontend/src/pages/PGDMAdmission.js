import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'pgdm',
    title: 'PGDM Admission',
    subtitle: 'Pursue a Post Graduate Diploma in Management from AICTE-approved autonomous institutions with industry-relevant curriculum.',
    icon: '📋',
    heroBackgroundImage: '',
    overview: [
        'The Post Graduate Diploma in Management (PGDM) is a 2-year postgraduate management program offered by autonomous institutions approved by AICTE. Unlike MBA, which is a degree program offered by universities, PGDM offers more flexibility in curriculum design and industry alignment.',
        'PGDM programs are highly valued by employers because their curriculum is frequently updated to match current industry demands. Top institutions like IIMs, XLRI, MDI, and IMI offer PGDM instead of MBA.',
        'Bschool Bridge helps you identify the best PGDM programs that align with your career aspirations and guides you through every aspect of the admission process.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with at least 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, CMAT, MAT, or institution-specific tests',
        'Final year graduation students are eligible to apply',
        'Some institutions require work experience (typically 1-3 years)',
        'Strong academic record and demonstrated leadership abilities',
    ],
    highlights: [
        { icon: '📈', title: 'Industry-Aligned', text: 'Curriculum updated regularly to match current industry trends and market demands.' },
        { icon: '🏅', title: 'AICTE Approved', text: 'All partner institutions are AICTE-approved, ensuring quality education and recognition.' },
        { icon: '🌍', title: 'Global Tie-ups', text: 'International collaborations with foreign universities for student exchange and dual degrees.' },
        { icon: '💼', title: 'Better Placements', text: 'PGDM campuses attract top MNCs and Fortune 500 companies for placements.' },
        { icon: '🎓', title: 'Flexible Curriculum', text: 'Autonomous institutions can design courses based on market demands, not university constraints.' },
        { icon: '🏢', title: 'Corporate Connect', text: 'Regular guest lectures, workshops, and live projects with industry leaders.' },
    ],
    curriculum: [
        'Managerial Economics & Business Environment',
        'Financial Accounting & Financial Management',
        'Marketing Management & Digital Marketing',
        'Human Resource Management & Labor Laws',
        'Business Analytics & Statistics',
        'Operations & Supply Chain Management',
        'Entrepreneurship & New Venture Creation',
        'Strategic Management & Corporate Governance',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (Full-time)' },
        { icon: '📋', label: 'Degree Type', value: 'PG Diploma (AICTE)' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, CMAT, GMAT' },
        { icon: '💰', label: 'Fee Range', value: '₹8L - ₹28L (Varies)' },
        { icon: '🎯', label: 'Avg. Placement', value: '₹10-30 LPA' },
    ],
    whyChoose: [
        'PGDM is offered by top autonomous institutions like IIMs which have more academic freedom',
        'Curriculum is more dynamic and industry-focused compared to traditional MBA programs',
        'Better industry exposure through mandatory summer internships and live projects',
        'PGDM graduates are equally valued (often preferred) by top recruiters',
        'Networking opportunities with industry professionals, alumni, and global faculty',
        'Many PGDM programs offer dual specialization options for broader career scope',
    ],
};

function PGDMAdmission() {
    return <CoursePage config={config} />;
}

export default PGDMAdmission;
