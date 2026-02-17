import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'direct-mba',
    title: 'Direct MBA Admission',
    subtitle: 'Secure your MBA seat directly based on academic merit, work experience, and profile strength — without the stress of competitive entrance exams.',
    icon: '⚡',
    heroBackgroundImage: '',
    overview: [
        'Direct MBA Admission is a streamlined admissions process where students can secure a seat in top management programs based on their academic performance, work experience, and overall profile strength, without solely depending on entrance exam scores.',
        'Many reputed B-schools in India offer management quota, institutional reserved seats, and direct admission pathways for deserving candidates. Bschool Bridge has established partnerships with 100+ colleges that offer legitimate direct admission options.',
        'Our counselors conduct a thorough profile evaluation and connect you with colleges where your profile best fits, ensuring a smooth and transparent admission process.',
    ],
    eligibility: [
        'Bachelor\'s degree from a recognized university with a minimum of 50% aggregate marks',
        'Entrance exam scores are recommended but not always mandatory for direct admission',
        'Work experience of 1+ years significantly strengthens direct admission applications',
        'Strong academic track record and extracurricular achievements',
        'Statement of Purpose (SOP) and Letters of Recommendation (LOR) may be required',
    ],
    highlights: [
        { icon: '⚡', title: 'Fast Process', text: 'Complete the admission process in 7-15 days instead of months of waiting.' },
        { icon: '🏅', title: 'Merit-Based', text: 'Admission based on your complete profile — academics, experience, and potential.' },
        { icon: '✅', title: 'Guaranteed Seat', text: 'Secure confirmed admission without the uncertainty of competitive selections.' },
        { icon: '🏛️', title: 'Top Colleges', text: 'Direct admission available in NAAC A/A+ graded and NBA-accredited institutions.' },
        { icon: '🎯', title: 'Profile Matching', text: 'AI-powered college recommendations based on your unique profile strengths.' },
        { icon: '📞', title: 'Dedicated Support', text: 'Personal admission counselor assigned to guide you through every step.' },
    ],
    curriculum: [
        'Principles of Management & Organizational Behavior',
        'Accounting for Managers & Corporate Finance',
        'Marketing Management & Consumer Analytics',
        'Human Resource Development & Talent Management',
        'Business Law & Corporate Ethics',
        'Supply Chain & Logistics Management',
        'Digital Business & E-commerce Management',
        'Capstone Project & Industry Dissertation',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (Full-time)' },
        { icon: '📋', label: 'Degree Type', value: 'MBA / PGDM' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'Optional / Merit-based' },
        { icon: '💰', label: 'Fee Range', value: '₹4L - ₹20L (Varies)' },
        { icon: '🎯', label: 'Process Duration', value: '7-15 Business Days' },
    ],
    whyChoose: [
        'Avoid the stress and uncertainty of highly competitive entrance exam-based admissions',
        'Ideal for working professionals who want a guaranteed admission with minimal disruption',
        'Faster admission process — get confirmed within 2 weeks of application',
        'Bschool Bridge partners only with accredited, transparent institutions for direct admission',
        'Suitable for candidates with strong profiles but modest entrance exam scores',
        'Holistic evaluation considers your complete profile, not just one exam score',
    ],
};

function DirectMBAAdmission() {
    return <CoursePage config={config} />;
}

export default DirectMBAAdmission;
