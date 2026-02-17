import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-business-analytics',
    title: 'MBA in Business Analytics',
    subtitle: 'Harness the power of data to drive business decisions with an MBA in Business Analytics — the fastest-growing specialization in management education.',
    icon: '📊',
    heroBackgroundImage: '',
    overview: [
        'An MBA in Business Analytics combines the rigor of data science with the strategic thinking of an MBA. As organizations worldwide adopt data-driven decision-making, the demand for professionals who can translate complex data into actionable business insights has skyrocketed.',
        'This specialization teaches you advanced statistical analysis, machine learning, predictive modeling, data visualization, and business intelligence — all within the context of real-world business challenges. You\'ll learn to use tools like Python, R, SQL, Tableau, Power BI, and cloud-based analytics platforms.',
        'Top B-schools like IIM Calcutta, ISB Hyderabad, IIM Bangalore, and Great Lakes have launched dedicated Business Analytics programs to meet industry demand. At Bschool Bridge, we help you choose the right analytics program based on your background and career goals.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline (Engineering/Science/Commerce preferred) with minimum 50% marks',
        'Valid entrance exam score — CAT, GMAT, GRE, or program-specific analytics aptitude tests',
        'Strong quantitative and logical reasoning abilities',
        'Basic programming knowledge (Python/R) is advantageous but not mandatory',
        'Work experience in IT, consulting, or analytics roles strengthens your application',
    ],
    highlights: [
        { icon: '🤖', title: 'AI & Machine Learning', text: 'Master supervised/unsupervised learning, deep learning, and NLP for business applications.' },
        { icon: '💼', title: 'Highest Demand', text: 'Analytics roles are growing at 30% annually — one of the fastest in any industry globally.' },
        { icon: '📈', title: 'Premium Salaries', text: 'Analytics MBAs command ₹12-40 LPA with top companies in India and abroad.' },
        { icon: '🔬', title: 'Hands-on Learning', text: 'Capstone projects with real company data from partners like Amazon, Flipkart, and Microsoft.' },
        { icon: '🌐', title: 'Cross-Industry Demand', text: 'Every industry needs analytics — healthcare, finance, retail, tech, and more.' },
        { icon: '🏅', title: 'Future-Proof Career', text: 'Data and AI are the foundation of all future business — your skills will always be relevant.' },
    ],
    curriculum: [
        'Statistics & Probability for Business',
        'Data Mining & Predictive Analytics',
        'Machine Learning & Artificial Intelligence',
        'Big Data Technologies (Hadoop, Spark)',
        'Business Intelligence & Data Visualization',
        'Marketing Analytics & Customer Analytics',
        'Financial Analytics & Risk Modeling',
        'Supply Chain Analytics & Operations Research',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Business Analytics' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, GMAT, GRE' },
        { icon: '💰', label: 'Avg. Package', value: '₹12-40 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'McKinsey, Amazon, Microsoft' },
    ],
    whyChoose: [
        'Business Analytics is the #1 emerging MBA specialization with the highest growth in demand',
        'Bridges the gap between technical data science and business strategy — a unique niche',
        'Analytics professionals are among the highest-paid across all management functions',
        'Skills in data and AI are transferable across every industry and geography',
        'Strong entrepreneurial potential — many data-driven startups are founded by analytics MBAs',
        'Future-proof career path as organizations increasingly rely on data for every decision',
    ],
};

function MBABusinessAnalytics() {
    return <CoursePage config={config} />;
}

export default MBABusinessAnalytics;
