import React from 'react';
import { Link } from 'react-router-dom';

function PageHero({ title, subtitle, breadcrumb, backgroundImage }) {
    const heroStyle = backgroundImage ? {
        background: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    } : {};

    // Split title into words and apply alternating colors
    const renderColoredTitle = (title) => {
        const words = title.split(' ');
        const colors = ['#ffffff', '#3b82f6', '#ffffff', '#2563eb']; // white, blue, white, darker blue
        
        return words.map((word, index) => (
            <span key={index} style={{ color: colors[index % colors.length] }}>
                {word}{index < words.length - 1 ? ' ' : ''}
            </span>
        ));
    };

    return (
        <section className="page-hero" style={heroStyle}>
            <div className="page-hero-content fade-in">
                {breadcrumb && (
                    <div className="page-hero-breadcrumb">
                        <Link to="/">Home</Link>
                        {breadcrumb.map((item, i) => (
                            <React.Fragment key={i}>
                                <span className="separator">›</span>
                                {item.path ? (
                                    <Link to={item.path}>{item.label}</Link>
                                ) : (
                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
                <h1 className="page-hero-title">{renderColoredTitle(title)}</h1>
                {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
            </div>
        </section>
    );
}

export default PageHero;
