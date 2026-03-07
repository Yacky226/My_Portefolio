import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Applies the `.revealed` class when the element enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
    options?: IntersectionObserverInit
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('revealed');
                    observer.unobserve(element); // Only animate once
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -60px 0px',
                ...options,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return ref;
}
