import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-hr',
    title: 'MBA in Human Resources',
    subtitle: 'Shape organizational culture and drive talent strategy with an MBA in HR from India\'s leading B-schools and MBA HR colleges known for exceptional placements.',
    icon: '👥',
    heroGradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    overview: [
        'An MBA in Human Resources (HR) is a specialized management program that prepares students to lead the people function in organizations. From talent acquisition and employee engagement to organizational development and HR analytics, this specialization covers every aspect of managing an organization\'s most valuable asset — its people.',
        'The demand for skilled HR professionals has surged as companies recognize that people strategy directly impacts business performance. Modern HR goes far beyond traditional personnel management — it now encompasses employer branding, people analytics, diversity & inclusion, HR technology, and strategic workforce planning.',
        'Top MBA HR colleges in India — including XLRI Jamshedpur, TISS Mumbai, IIM Ranchi, MDI Gurgaon, and SCMHRD Pune — are renowned for producing India\'s finest HR leaders. Bschool Bridge helps you secure admission to these premier MBA HR colleges, ensuring you receive world-class education and access to the best HR placement opportunities in the country.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, MAT, or institution-specific tests like XAT for XLRI',
        'Strong interpersonal and communication skills are highly valued',
        'Psychology, sociology, or liberal arts background can be advantageous',
        'Work experience in HR, recruitment, or people management is a plus for executive programs',
    ],
    highlights: [
        { icon: '🎯', title: 'Strategic HR', text: 'Learn to align HR strategy with business objectives for maximum organizational impact.' },
        { icon: '📊', title: 'People Analytics', text: 'Master HR analytics, workforce planning, and data-driven people decisions.' },
        { icon: '🏛️', title: 'Top HR Colleges', text: 'Admission support for XLRI, TISS, IIM Ranchi, MDI, and other top MBA HR colleges.' },
        { icon: '💼', title: 'CHRO Pipeline', text: 'Fast-track path to CHRO, VP-HR, and Head of People roles at leading companies.' },
        { icon: '🌱', title: 'Culture Building', text: 'Learn to design and sustain high-performance organizational cultures.' },
        { icon: '🤖', title: 'HR Tech', text: 'Explore AI in recruitment, HR automation, and emerging HR technology platforms.' },
    ],
    curriculum: [
        'Human Resource Management & Organizational Behavior',
        'Talent Acquisition & Employer Branding',
        'Compensation & Benefits Management',
        'Labor Laws & Industrial Relations',
        'HR Analytics & People Data Science',
        'Learning & Development (L&D) Strategy',
        'Performance Management & Employee Engagement',
        'Organizational Development & Change Management',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Human Resources' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, GMAT, MAT' },
        { icon: '💰', label: 'Avg. Package', value: '₹10-28 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'Aon, Deloitte, Accenture' },
    ],
    whyChoose: [
        'MBA HR colleges in India like XLRI and TISS produce the country\'s most sought-after HR leaders',
        'HR is a function that exists in every organization — ensuring consistent demand for HR MBAs',
        'Modern HR combines psychology, business strategy, and technology — a unique and fulfilling blend',
        'CHRO is one of the fastest-growing C-suite roles with compensation matching that of CFOs and CMOs',
        'HR analytics and HR tech are emerging fields offering cutting-edge career opportunities',
        'Strong work-life balance compared to other management specializations like investment banking',
    ],
};

function MBAHR() {
    return <CoursePage config={config} />;
}

export default MBAHR;
