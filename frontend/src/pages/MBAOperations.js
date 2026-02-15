import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-operations',
    title: 'MBA in Operations Management',
    subtitle: 'Drive operational excellence and supply chain efficiency with an MBA in Operations — the backbone of every successful organization.',
    icon: '⚙️',
    heroGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    overview: [
        'An MBA in Operations Management prepares you to optimize business processes, manage supply chains, and drive efficiency across organizations. Operations managers ensure that products are manufactured, services are delivered, and resources are allocated in the most efficient and cost-effective manner possible.',
        'With the rise of global supply chains, e-commerce logistics, Industry 4.0, and lean manufacturing, the demand for operations professionals has never been higher. Companies like Amazon, Flipkart, Tata Motors, and Reliance actively seek MBA operations graduates to manage their complex operational ecosystems.',
        'Top B-schools including IIM Ahmedabad, IIT Bombay\'s SJMSOM, NITIE Mumbai (now IIM Mumbai), and IIM Udaipur are renowned for their operations management programs. Bschool Bridge connects you with the best programs based on your career aspirations.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline (Engineering background preferred) with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, CMAT, or equivalent',
        'Analytical thinking and problem-solving aptitude',
        'Work experience in manufacturing, supply chain, or logistics is advantageous',
        'Six Sigma, Lean, or PMP certifications can strengthen your profile',
    ],
    highlights: [
        { icon: '🏭', title: 'Industry 4.0', text: 'Learn smart manufacturing, IoT, robotics, and digital twin technologies.' },
        { icon: '🚛', title: 'Supply Chain', text: 'Master end-to-end supply chain management, procurement, and logistics optimization.' },
        { icon: '📉', title: 'Lean & Six Sigma', text: 'Become certified in Lean Manufacturing and Six Sigma methodologies.' },
        { icon: '🎯', title: 'Process Excellence', text: 'Learn to design, optimize, and automate business processes for maximum efficiency.' },
        { icon: '🌐', title: 'Global Ops', text: 'Manage international supply chains, global sourcing, and cross-border logistics.' },
        { icon: '💼', title: 'Diverse Roles', text: 'Roles in consulting, manufacturing, logistics, e-commerce, and technology firms.' },
    ],
    curriculum: [
        'Operations Management & Production Planning',
        'Supply Chain Management & Logistics',
        'Quality Management & Six Sigma',
        'Project Management & Agile Methodology',
        'Operations Research & Optimization',
        'Procurement & Vendor Management',
        'Industry 4.0 & Smart Manufacturing',
        'Service Operations & Capacity Planning',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Operations Management' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, GMAT' },
        { icon: '💰', label: 'Avg. Package', value: '₹10-30 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'Amazon, Tata, Mahindra' },
    ],
    whyChoose: [
        'Operations is the backbone of business — every company needs operations professionals',
        'E-commerce boom has created massive demand for supply chain and logistics managers',
        'Excellent work-life balance compared to B-school peers in consulting or investment banking',
        'Industry 4.0 and smart manufacturing are creating exciting new career opportunities',
        'Operations MBAs are well-positioned for CEO roles — many Fortune 500 CEOs have ops backgrounds',
        'Six Sigma and Lean certifications add globally recognized credentials to your MBA',
    ],
};

function MBAOperations() {
    return <CoursePage config={config} />;
}

export default MBAOperations;
