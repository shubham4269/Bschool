import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-without-cat',
    title: 'MBA Without CAT',
    subtitle: 'Explore top MBA programs that accept scores from MAT, XAT, ATMA, CMAT, GMAT, and other non-CAT entrance exams.',
    icon: '🚀',
    heroGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    overview: [
        'Not everyone cracks the CAT exam, but that doesn\'t mean your MBA dream has to end there. India has a thriving ecosystem of excellent B-schools that accept scores from alternative entrance exams like MAT, XAT, ATMA, CMAT, GMAT, and several state-level exams.',
        'Many of these institutions offer world-class education, excellent placements, and strong alumni networks — all without requiring a CAT score. Bschool Bridge specializes in helping students identify and get admitted to these high-quality non-CAT MBA programs.',
        'Our expert counselors evaluate your profile and recommend the best entrance exams and B-schools that maximize your chances of admission to a top management program.',
    ],
    eligibility: [
        'Bachelor\'s degree from a recognized university with minimum 50% aggregate marks',
        'Valid score in MAT, XAT, ATMA, CMAT, GMAT, NMAT, or state-level entrance exams',
        'Some colleges conduct their own entrance tests — we guide you through all options',
        'Final year graduation students are eligible to apply to most programs',
        'Work experience may strengthen your application but is not mandatory for most programs',
    ],
    highlights: [
        { icon: '📝', title: 'Multiple Exams', text: 'Accept scores from MAT, XAT, ATMA, CMAT, GMAT, and state-level exams.' },
        { icon: '🏛️', title: 'Quality Colleges', text: 'NAAC A+ graded and AICTE-approved institutions with excellent infrastructure.' },
        { icon: '💰', title: 'Affordable Fees', text: 'Many non-CAT colleges offer quality MBA at significantly lower fees.' },
        { icon: '📊', title: 'Good Placements', text: 'Partner colleges offer placement packages ranging from ₹5-18 LPA.' },
        { icon: '🔄', title: 'Multiple Intakes', text: 'Some colleges offer multiple admission cycles throughout the year.' },
        { icon: '🎯', title: 'Easy Entrance', text: 'Exams like MAT and ATMA are easier and conducted multiple times a year.' },
    ],
    curriculum: [
        'General Management & Leadership',
        'Marketing Strategy & Brand Management',
        'Financial Planning & Investment Management',
        'Human Capital Management',
        'Operations Excellence & Quality Management',
        'Business Communication & Negotiation Skills',
        'Entrepreneurship & Small Business Management',
        'Business Research Methods & Analytics',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (Full-time)' },
        { icon: '📋', label: 'Degree Type', value: 'MBA / PGDM' },
        { icon: '📍', label: 'Mode', value: 'Full-time / Part-time' },
        { icon: '📝', label: 'Entrance Exams', value: 'MAT, XAT, ATMA, CMAT' },
        { icon: '💰', label: 'Fee Range', value: '₹3L - ₹15L (Varies)' },
        { icon: '🎯', label: 'Avg. Placement', value: '₹5-18 LPA' },
    ],
    whyChoose: [
        'Multiple exam options mean more chances to secure admission every year',
        'MAT/ATMA are conducted 4-5 times a year — you can attempt multiple times',
        'Many excellent B-schools like Symbiosis, Christ, and Alliance accept non-CAT scores',
        'Lower competition compared to CAT-based admissions increases selection chances',
        'GMAT-accepting colleges provide access to internationally recognized programs',
        'Cost-effective education with strong ROI from quality placements',
    ],
};

function MBAWithoutCAT() {
    return <CoursePage config={config} />;
}

export default MBAWithoutCAT;
