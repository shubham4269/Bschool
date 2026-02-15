import React from 'react';
import { Link } from 'react-router-dom';

function PageHero({ title, subtitle, breadcrumb }) {
    return (
        <section className="page-hero">
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
                <h1 className="page-hero-title">{title}</h1>
                {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
            </div>
        </section>
    );
}

export default PageHero;
