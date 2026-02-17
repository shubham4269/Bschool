import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CountUp component — animates a number from 0 to `end` when it scrolls into view
 * AND when the user hovers over it.
 *
 * Props:
 *  - end: target number (e.g. 15000)
 *  - duration: animation duration in ms (default 2000)
 *  - suffix: string appended after the number (e.g. "+", "%")
 *  - prefix: string prepended before the number (e.g. "₹")
 *  - separator: thousands separator (default ",")
 *  - decimals: decimal places (default 0)
 */
export default function CountUp({
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    separator = ',',
    decimals = 0,
    className = '',
    style = {},
}) {
    const [count, setCount] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [hasScrollTriggered, setHasScrollTriggered] = useState(false);
    const ref = useRef(null);
    const rafRef = useRef(null);

    // Trigger when visible (scroll)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasScrollTriggered) {
                    setHasScrollTriggered(true);
                    setShouldAnimate(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasScrollTriggered]);

    // Animate when triggered (by scroll or hover)
    const runAnimation = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    }, [end, duration]);

    useEffect(() => {
        if (shouldAnimate) {
            setCount(0);
            runAnimation();
            setShouldAnimate(false);
        }
    }, [shouldAnimate, runAnimation]);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Hover handler — replays the count animation
    const handleMouseEnter = () => {
        setCount(0);
        setShouldAnimate(true);
    };

    const formatNumber = (num) => {
        const fixed = num.toFixed(decimals);
        if (!separator) return fixed;

        const [intPart, decPart] = fixed.split('.');
        const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return decPart ? `${formatted}.${decPart}` : formatted;
    };

    return (
        <span
            ref={ref}
            className={className}
            style={{ cursor: 'default', ...style }}
            onMouseEnter={handleMouseEnter}
        >
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
}
