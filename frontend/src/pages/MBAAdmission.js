import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba',
    title: 'MBA Admission',
    subtitle: 'Get admitted to top MBA colleges across India with expert guidance, career counseling, and end-to-end application support.',
    icon: '🎓',
    heroGradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    overview: [
        'The Master of Business Administration (MBA) is one of the most sought-after postgraduate degrees globally. An MBA equips you with essential business acumen, leadership skills, and strategic thinking capabilities that top employers value.',
        'At Bschool Bridge, we help you navigate the complex MBA admission landscape — from choosing the right entrance exam and colleges to acing your interviews and securing your seat at a top-ranked institution.',
        'Whether you\'re targeting IIMs, XLRI, FMS, SP Jain, or any other premier B-school, our expert counselors provide personalized guidance at every step of the journey.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with minimum 50% marks (45% for reserved categories)',
        'Valid score in CAT, XAT, GMAT, MAT, CMAT, NMAT, or state-level MBA entrance exams',
        'Final year graduation students can also apply (provisional admission)',
        'Work experience of 0-5 years preferred for most full-time MBA programs',
        'Strong communication skills and leadership potential',
    ],
    highlights: [
        { icon: '🏛️', title: 'Top Colleges', text: 'Access to 200+ AICTE, UGC & NAAC accredited MBA institutions across India.' },
        { icon: '💼', title: 'High Placements', text: 'Average placement package of ₹8-25 LPA at our partner B-schools.' },
        { icon: '🌐', title: 'Global Exposure', text: 'International exchange programs, global certifications, and foreign faculty.' },
        { icon: '📊', title: 'Industry Connect', text: 'Live projects, industry visits, and corporate mentorship programs.' },
        { icon: '🎯', title: 'Specializations', text: 'Finance, Marketing, HR, Operations, IT, Healthcare & more specializations.' },
        { icon: '💰', title: 'Scholarships', text: 'Merit and need-based scholarships covering up to 100% of tuition fees.' },
    ],
    curriculum: [
        'Marketing Management & Consumer Behavior',
        'Financial Management & Corporate Finance',
        'Human Resource Management & Organizational Behavior',
        'Operations Management & Supply Chain',
        'Business Analytics & Data-Driven Decision Making',
        'Strategic Management & Business Policy',
        'Entrepreneurship & Innovation Management',
        'International Business & Global Trade',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Degree Type', value: 'Master\'s Degree' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, GMAT, MAT' },
        { icon: '💰', label: 'Fee Range', value: '₹5L - ₹25L (Varies)' },
        { icon: '🎯', label: 'Avg. Placement', value: '₹8-25 LPA' },
    ],
    whyChoose: [
        'Globally recognized degree that opens doors to leadership roles across industries',
        'Develops critical thinking, problem-solving, and managerial competencies',
        'Extensive alumni networks that provide lifelong career support and mentorship',
        'Summer internships that provide real-world business experience before graduation',
        'Opportunities for dual specialization to broaden your career options',
        'Strong ROI — MBA graduates see 2-3x salary increase within 2-3 years',
    ],
};

function MBAAdmission() {
    return <CoursePage config={config} />;
}

export default MBAAdmission;
