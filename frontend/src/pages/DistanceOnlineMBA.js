import React from 'react';
import CoursePage from './CoursePage';

const config = {
    courseSlug: 'distance-mba',
    title: 'Distance / Online MBA',
    subtitle: 'Earn a UGC-recognized MBA degree from top universities through distance or online learning — study anytime, anywhere at your own pace.',
    icon: '🌐',
    heroGradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    overview: [
        'Distance and Online MBA programs offer a flexible and affordable pathway to earn a management degree from some of India\'s most reputed universities without attending regular classes. These programs are recognized by UGC-DEB (University Grants Commission - Distance Education Bureau) and are valid for all job applications.',
        'With advancements in educational technology, online MBA programs now offer interactive live classes, recorded lectures, virtual labs, discussion forums, and digital libraries — providing an experience that closely mirrors on-campus learning.',
        'Bschool Bridge helps you choose from UGC-approved distance and online MBA programs offered by institutions like IGNOU, Amity Online, Manipal Online, Symbiosis SCDL, and many more.',
    ],
    eligibility: [
        'Bachelor\'s degree from a recognized university with minimum 50% marks',
        'No entrance exam required for most distance/online MBA programs',
        'Working professionals, homemakers, and entrepreneurs are all eligible',
        'No upper age limit for most distance learning programs',
        'Basic computer literacy and internet access required for online programs',
    ],
    highlights: [
        { icon: '🏠', title: 'Study From Home', text: 'No relocation needed — attend classes online from the comfort of your home.' },
        { icon: '💰', title: 'Affordable', text: 'Fee as low as ₹50,000 - ₹2,00,000 for the entire 2-year program.' },
        { icon: '🎓', title: 'UGC Recognized', text: 'All partner programs are UGC-DEB approved and valid for government jobs.' },
        { icon: '⏰', title: 'Flexible Schedule', text: 'Self-paced learning with recorded lectures — study when it suits you.' },
        { icon: '💼', title: 'Work & Learn', text: 'Perfect for working professionals who cannot attend full-time programs.' },
        { icon: '📱', title: 'Digital Learning', text: 'Access courses via mobile app, live classes, and interactive learning platforms.' },
    ],
    curriculum: [
        'Principles of Management & Business Communication',
        'Managerial Accounting & Financial Management',
        'Marketing Management & Digital Marketing',
        'Human Resource Management & Organizational Behavior',
        'Business Research Methods & Strategy',
        'Operations Management & Project Management',
        'International Business & Economic Environment',
        'Elective Specialization (Finance / Marketing / HR / IT)',
    ],
    sidebarInfo: [
        { icon: '⏱️', label: 'Duration', value: '2 Years (Flexible)' },
        { icon: '📋', label: 'Degree Type', value: 'MBA (UGC-DEB Approved)' },
        { icon: '📍', label: 'Mode', value: 'Online / Distance' },
        { icon: '📝', label: 'Entrance Exams', value: 'Not Required' },
        { icon: '💰', label: 'Fee Range', value: '₹50K - ₹2L (Total)' },
        { icon: '🎯', label: 'EMI Available', value: 'Yes, 0% Interest' },
    ],
    whyChoose: [
        'Most affordable way to earn an MBA degree from a reputed university',
        'UGC-DEB recognition ensures your degree is valid for all employment opportunities',
        'No need to quit your job or relocate — study at your convenience',
        'Same curriculum and faculty as regular MBA in many universities',
        'EMI options available making education financially accessible to everyone',
        'Ideal for tier-2/3 city students who lack access to quality B-schools locally',
    ],
};

function DistanceOnlineMBA() {
    return <CoursePage config={config} />;
}

export default DistanceOnlineMBA;
