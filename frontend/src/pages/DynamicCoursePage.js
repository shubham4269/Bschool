import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoursePage from './CoursePage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function DynamicCoursePage({ type }) {
    const { slug } = useParams();
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const endpoint = type === 'service' ? 'services' : 'specializations';
                const res = await fetch(`${API_URL}/api/${endpoint}/${slug}`);
                const data = await res.json();

                if (data.success) {
                    const item = data.service || data.specialization;
                    setConfig({
                        courseSlug: item.slug,
                        title: item.title,
                        subtitle: item.subtitle,
                        icon: item.icon,
                        cardBackgroundImage: item.cardBackgroundImage,
                        heroBackgroundImage: item.heroBackgroundImage,
                        overview: item.overview || [],
                        eligibility: item.eligibility || [],
                        highlights: item.highlights || [],
                        curriculum: item.curriculum || [],
                        sidebarInfo: item.sidebarInfo || [],
                        whyChoose: item.whyChoose || [],
                    });
                } else {
                    setError('Page not found');
                }
            } catch (err) {
                setError('Failed to load page data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, type]);

    if (loading) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--gray-50)',
                paddingTop: '100px',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid #e2e8f0',
                        borderTopColor: '#1E3A8A',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px',
                    }} />
                    <div style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>Loading program details...</div>
                </div>
            </div>
        );
    }

    if (error || !config) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--gray-50)',
                paddingTop: '100px',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.5rem',
                        color: 'var(--gray-800)',
                        marginBottom: '8px',
                    }}>
                        Page Not Found
                    </h2>
                    <p style={{ color: 'var(--gray-500)' }}>
                        The program you're looking for doesn't exist or has been removed.
                    </p>
                </div>
            </div>
        );
    }

    return <CoursePage config={config} />;
}

export default DynamicCoursePage;
