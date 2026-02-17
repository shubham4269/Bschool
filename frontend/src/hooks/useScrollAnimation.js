import { useEffect, useRef } from 'react';

/**
 * Custom hook that adds scroll-triggered reveal animations using IntersectionObserver.
 * Uses a MutationObserver to detect dynamically added elements (e.g. after API fetch).
 *
 * Usage:
 *   const containerRef = useScrollAnimation();
 *   <div ref={containerRef}>
 *     <div data-animate="fade-up">...</div>
 *     <div data-animate="fade-left" data-delay="200">...</div>
 *   </div>
 */
export default function useScrollAnimation(threshold = 0.12) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-delay') || 0;
                        setTimeout(() => {
                            entry.target.classList.add('animate-visible');
                        }, parseInt(delay));
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -30px 0px' }
        );

        // Observe all unvisited data-animate elements
        const observeAll = () => {
            const elements = container.querySelectorAll('[data-animate]:not(.animate-visible)');
            elements.forEach((el) => io.observe(el));
        };

        observeAll();

        // Watch for dynamically added elements (e.g. after API fetch)
        const mo = new MutationObserver(() => {
            observeAll();
        });

        mo.observe(container, { childList: true, subtree: true });

        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, [threshold]);

    return containerRef;
}
