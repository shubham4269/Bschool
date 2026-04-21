import React, { useState, useEffect } from 'react';

function HeroSlider({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Default images if none provided
    const defaultImages = [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', 
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80', // Graduation
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', // Business meeting
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80', // Students studying
    ];

    const slideImages = images.length > 0 ? images : defaultImages;

    // Auto-advance slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slideImages.length);
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval);
    }, [slideImages.length]);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
        }}>
            {/* Background Images */}
            {slideImages.map((image, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        opacity: currentIndex === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                />
            ))}

            {/* Light Overlay for text readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                zIndex: 1,
            }} />

            {/* Slider Indicators - Minimal and Clean */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '10px 16px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
                {slideImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: '8px',
                            height: '8px',
                            border: 'none',
                            borderRadius: '50%',
                            background: currentIndex === index 
                                ? '#ffffff' 
                                : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                            transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
                        }}
                        onMouseEnter={(e) => {
                            if (currentIndex !== index) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentIndex !== index) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;
