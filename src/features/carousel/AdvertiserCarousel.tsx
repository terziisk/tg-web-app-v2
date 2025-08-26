// src/features/carousel/AdvertiserCarousel.tsx

import { useEffect, useMemo } from 'react';
import Carousel from './Carousel';
import { useTranslation } from 'react-i18next';

const AdvertiserCarousel = ({ onStart }: { onStart: () => void }) => {
    const { t } = useTranslation();
     
    const advertiserSlides = useMemo(() => {
        return [
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('advertiser_slide1_text'))}`,
            `./anim/screen-adv1.png`,

            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('advertiser_slide2_text'))}`,
            `./anim/screen-adv2.png`,
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('advertiser_slide3_text'))}`,
            
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('advertiser_slide4_text'))}`,
        ];
    }, [t]);
    
    useEffect(() => {
        // Initialize Telegram Web App
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }, []);
    
    return (
        <div className="h-screen w-full flex flex-col bg-[var(--tg-theme-bg-color)]">
            <div className="flex-grow relative">
                <Carousel slides={advertiserSlides} />
            </div>
            <div className="p-6 text-center shrink-0" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #101820)'}}>
                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--tg-theme-text-color, #ffffff)'}}>{t('advertiser_title')}</h1>
                <p className="mb-6" style={{ color: 'var(--tg-theme-hint-color, #999999)'}}>{t('advertiser_description')}</p>
                <button 
                    onClick={onStart} 
                    className="w-full py-3 px-4 rounded-lg font-semibold text-lg transition-transform duration-200 active:scale-95"
                    style={{ backgroundColor: 'var(--tg-theme-button-color, #5288c1)', color: 'var(--tg-theme-button-text-color, #ffffff)'}}
                >
                    {t('advertiser_button')}
                </button>
            </div>
        </div>
    );
};

export default AdvertiserCarousel;