import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-international-business',
    title: 'MBA in International Business',
    subtitle: 'Go global with an MBA in International Business — master cross-border trade, global strategy, and international market expansion.',
    icon: '🌍',
    heroBackgroundImage: '',
    overview: [
        'An MBA in International Business prepares you to navigate the complexities of global commerce, cross-cultural management, and international market strategy. As Indian companies expand globally and multinational corporations deepen their India operations, the demand for professionals with international business acumen has never been higher.',
        'This specialization covers international trade policy, export-import management, foreign exchange, cross-cultural negotiations, global supply chain management, and international marketing — giving you a 360-degree understanding of how business operates across borders.',
        'Premier institutions like IIFT Delhi, IIM Lucknow, Symbiosis SIIB, Amity International Business School, and Christ University offer specialized MBA International Business programs. Bschool Bridge helps you identify the best program based on your career goals — whether you aim to work with global MNCs, Indian companies going overseas, or international trade organizations.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, IIFT exam, or equivalent',
        'Strong communication skills and cross-cultural awareness',
        'Foreign language proficiency (French, German, Spanish, Mandarin) is a plus',
        'International exposure through travel, internships, or exchange programs is advantageous',
    ],
    highlights: [
        { icon: '✈️', title: 'Global Exposure', text: 'International exchange programs, foreign university semesters, and global study tours.' },
        { icon: '🏛️', title: 'Trade & Policy', text: 'Deep understanding of WTO, trade agreements, tariffs, and international trade law.' },
        { icon: '💱', title: 'Forex & Finance', text: 'Master foreign exchange management, international finance, and cross-border M&A.' },
        { icon: '🤝', title: 'Cross-Cultural Skills', text: 'Learn to manage diverse teams, negotiate across cultures, and build global partnerships.' },
        { icon: '📦', title: 'Global Supply Chain', text: 'Design and manage international supply chains, logistics, and distribution networks.' },
        { icon: '🌐', title: 'Expat Opportunities', text: 'Opportunities for international postings in MNCs across US, Europe, Middle East, and Southeast Asia.' },
    ],
    curriculum: [
        'International Business Environment & Strategy',
        'Export-Import Management & Trade Finance',
        'International Marketing & Cross-Cultural Consumer Behavior',
        'Foreign Exchange & International Financial Management',
        'Global Supply Chain & Logistics Management',
        'International Human Resource Management',
        'International Trade Law & WTO Regulations',
        'Emerging Markets & Country Risk Analysis',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'International Business' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, IIFT, XAT, GMAT' },
        { icon: '💰', label: 'Avg. Package', value: '₹10-30 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'KPMG, EY, Citi, Nestle' },
    ],
    whyChoose: [
        'Growing India-global trade (target $2 trillion by 2030) is creating massive demand for IB professionals',
        'Opportunity for international postings, global travel, and expatriate packages from day one',
        'Unique skills in cross-cultural management that cannot be easily automated or replaced',
        'IIFT Delhi and IIM programs have exceptional 100% placement records in international business',
        'Opens doors to careers in diplomacy, international organizations (UN, World Bank), and trade bodies',
        'Dual-degree opportunities with foreign universities add international credentials to your resume',
    ],
};

function MBAInternationalBusiness() {
    return <CoursePage config={config} />;
}

export default MBAInternationalBusiness;
