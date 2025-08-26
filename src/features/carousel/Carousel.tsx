// src/features/carousel/Carousel.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// --- SVG ICONS ---
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

// --- CAROUSEL COMPONENT ---
const Carousel = ({ slides, interval = 5000 }: { slides: string[], interval?: number }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);
    
    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, [slides.length]);
    
    const goToPrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 75) {
            goToNext();
        }

        if (touchStartX.current - touchEndX.current < -75) {
            goToPrevious();
        }
    };
    
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(goToNext, interval);
        return () => resetTimeout();
    }, [currentIndex, goToNext, interval, resetTimeout]);

    return (
        <div 
            className="relative w-full h-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                        <img src={slide} alt={`Feature slide ${index + 1}`} className="h-full w-auto object-contain" />
                    </div>
                ))}
            </div>

            <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors" aria-label={t('carousel_aria_previous')}>
                <ChevronLeftIcon />
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors" aria-label={t('carousel_aria_next')}>
                <ChevronRightIcon />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'w-6 bg-white' : 'bg-white/50'}`}
                        aria-label={t('carousel_aria_goToSlide', { slideNumber: slideIndex + 1 })}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;