import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'mba-marketing',
    title: 'MBA in Marketing',
    subtitle: 'Master the art and science of marketing with an MBA specialization that prepares you for leadership roles in brand management, digital marketing, and consumer strategy.',
    icon: '📢',
    heroGradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    overview: [
        'An MBA in Marketing is one of the most popular and dynamic specializations in the business world. It equips students with deep knowledge of consumer behavior, brand strategy, market research, digital marketing, advertising, and sales management — all essential skills for driving business growth in today\'s competitive landscape.',
        'Marketing professionals are in high demand across every industry — from FMCG and retail to technology, healthcare, and financial services. With the rapid growth of digital channels, the scope of marketing has expanded dramatically, creating exciting career opportunities in performance marketing, content strategy, social media management, and marketing analytics.',
        'At Bschool Bridge, we connect you with top-ranked MBA programs specializing in marketing, offered by premier B-schools known for strong industry connections and outstanding placement records in marketing roles.',
    ],
    eligibility: [
        'Bachelor\'s degree in any discipline from a recognized university with minimum 50% marks',
        'Valid entrance exam score — CAT, XAT, GMAT, MAT, CMAT, or equivalent',
        'Strong communication and creative thinking skills are advantageous',
        'Work experience in sales, marketing, or advertising is a plus but not mandatory',
        'Final year graduation students can also apply',
    ],
    highlights: [
        { icon: '📊', title: 'Brand Management', text: 'Learn to build, manage, and grow iconic brands across traditional and digital channels.' },
        { icon: '📱', title: 'Digital Marketing', text: 'Master SEO, SEM, social media, content marketing, and performance marketing strategies.' },
        { icon: '🎯', title: 'Consumer Insights', text: 'Understand consumer psychology, behavior patterns, and data-driven decision making.' },
        { icon: '💰', title: 'High ROI Careers', text: 'Marketing MBAs command salaries of ₹8-30 LPA in top companies across India.' },
        { icon: '🌐', title: 'Global Opportunities', text: 'Marketing skills are universally valued — work anywhere in the world.' },
        { icon: '🏆', title: 'Leadership Roles', text: 'Fast-track to CMO, VP Marketing, and Brand Director positions.' },
    ],
    curriculum: [
        'Marketing Management & Consumer Behavior',
        'Brand Management & Advertising Strategy',
        'Digital Marketing & Social Media Marketing',
        'Sales & Distribution Management',
        'Market Research & Marketing Analytics',
        'Retail Management & E-commerce Strategy',
        'Integrated Marketing Communications (IMC)',
        'Product Management & Innovation',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (4 Semesters)' },
        { icon: '📋', label: 'Specialization', value: 'Marketing Management' },
        { icon: '📍', label: 'Mode', value: 'Full-time, On-campus' },
        { icon: '📝', label: 'Entrance Exams', value: 'CAT, XAT, GMAT, MAT' },
        { icon: '💰', label: 'Avg. Package', value: '₹8-30 LPA' },
        { icon: '🎯', label: 'Top Recruiters', value: 'HUL, P&G, Amazon, Google' },
    ],
    whyChoose: [
        'Marketing is the largest recruiter at most top B-schools with the most diverse career options',
        'Combines creativity with analytics — ideal for both left-brain and right-brain thinkers',
        'Digital transformation has created massive demand for marketing-savvy MBAs',
        'Offers entrepreneurial pathways — many successful startups are founded by marketing MBAs',
        'Excellent opportunities in emerging fields like influencer marketing, MarTech, and growth hacking',
        'Strong alumni networks in marketing provide lifelong career support and mentorship',
    ],
};

function MBAMarketing() {
    return <CoursePage config={config} />;
}

export default MBAMarketing;
