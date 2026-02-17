import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-finance',
    title: 'MBA in Finance',
    subtitle: 'Build a high-impact career in investment banking, corporate finance, and financial analytics with an MBA in Finance from India\'s top B-schools.',
    icon: '💹',
    heroBackgroundImage: '',
    overview: [
        'An MBA in Finance India is among the most prestigious and rewarding specializations in management education. It prepares students for leadership roles in banking, investment management, corporate finance, financial consulting, and fintech — sectors that form the backbone of any economy.',
        'Finance professionals are critical to every organization. Whether it\'s a multinational corporation managing billions in assets, a startup seeking venture capital, or a government body designing fiscal policy, MBA Finance graduates are at the forefront of strategic financial decision-making.',
        'India\'s financial services industry is projected to grow to $1.5 trillion by 2025, creating unprecedented demand for finance professionals. At Bschool Bridge, we guide you to the best MBA in Finance programs in India — from IIM Ahmedabad and IIM Bangalore to ISB, XLRI, and FMS Delhi — ensuring you gain the skills and credentials to excel in this highly competitive field.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline (Commerce/Science/Engineering preferred) with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, CMAT, SNAP, or NMAT',
        'Strong quantitative aptitude and analytical reasoning skills',
        'CFA, CA, or CMA certifications can enhance your profile significantly',
        'Work experience in banking, accounting, or financial services is advantageous',
    ],
    highlights: [
        { icon: '🏦', title: 'Investment Banking', text: 'Prepare for roles at Goldman Sachs, JP Morgan, Morgan Stanley, and top Indian banks.' },
        { icon: '📈', title: 'Highest Packages', text: 'MBA Finance graduates earn among the highest salaries — ₹12-50 LPA at top B-schools.' },
        { icon: '💎', title: 'CFA Integration', text: 'Many programs integrate CFA curriculum, giving you dual credentials.' },
        { icon: '🔢', title: 'Financial Analytics', text: 'Master financial modeling, risk assessment, derivatives, and algorithmic trading.' },
        { icon: '🌍', title: 'Global Finance Hubs', text: 'Opportunities in Mumbai, Singapore, Dubai, London, and New York.' },
        { icon: '🚀', title: 'Fintech Revolution', text: 'Lead innovation in digital payments, blockchain, robo-advisory, and InsurTech.' },
    ],
    curriculum: [
        'Corporate Finance & Financial Management',
        'Investment Analysis & Portfolio Management',
        'Financial Accounting & Reporting',
        'Banking & Insurance Management',
        'Derivatives & Risk Management',
        'Mergers, Acquisitions & Corporate Restructuring',
        'Financial Modeling & Valuation',
        'Fintech, Blockchain & Digital Finance',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Finance Management' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, GMAT, SNAP' },
        { icon: '💰', label: 'Avg. Package', value: '₹12-50 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'Goldman Sachs, Deloitte, EY' },
    ],
    whyChoose: [
        'MBA in Finance India offers the highest ROI with starting salaries of ₹12-50 LPA at top B-schools',
        'Finance is a recession-proof career — financial expertise is needed in every economic condition',
        'Opens doors to prestigious roles in investment banking, private equity, and venture capital',
        'India\'s growing fintech ecosystem offers unique entrepreneurial opportunities for finance MBAs',
        'CFA-aligned programs provide globally recognized credentials alongside your MBA degree',
        'Strong analytical foundation enables easy transition to consulting, analytics, or C-suite roles',
    ],
};

function MBAFinance() {
    return <CoursePage config={config} />;
}

export default MBAFinance;
