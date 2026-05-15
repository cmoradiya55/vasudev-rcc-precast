import { useState, useEffect, useRef } from "react";

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState({
        width: 1024, // Consistent default for both Server and Client initial render
        itemsPerSlide: 3, 
    });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const updateScreenSize = () => {
            // Debounce with rAF to prevent forced reflow / layout thrashing
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const width = window.innerWidth;
                let itemsPerSlide = 3;

                if (width < 640) {
                    itemsPerSlide = 1; // Small screens
                } else if (width < 1024) {
                    itemsPerSlide = 2; // Medium screens
                }

                setScreenSize({ width, itemsPerSlide });
            });
        };

        updateScreenSize(); // Set initial value
        window.addEventListener("resize", updateScreenSize, { passive: true });

        return () => {
            window.removeEventListener("resize", updateScreenSize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return screenSize;
}
