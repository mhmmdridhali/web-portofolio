"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal() {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementsRef = useRef<Set<HTMLElement>>(new Set());

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.remove("opacity-0", "translate-y-10");
                        el.classList.add("opacity-100", "translate-y-0");
                        observerRef.current?.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        // Observe any elements already registered
        elementsRef.current.forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const revealRef = useCallback((el: HTMLElement | null) => {
        if (el) {
            elementsRef.current.add(el);
            observerRef.current?.observe(el);
        }
    }, []);

    return revealRef;
}
