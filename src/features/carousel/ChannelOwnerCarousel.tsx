// src/features/carousel/ChannelOwnerCarousel.tsx

import { useEffect, useMemo } from 'react';
import Carousel from './Carousel';
import { useTranslation } from 'react-i18next';

const ChannelOwnerCarousel = ({ onStart }: { onStart: () => void }) => {
    const { t } = useTranslation();

    const channelOwnerSlides = useMemo(() => {
        return [
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('channelOwner_slide1_text'))}`,
            `./anim/screen-stats.png`,

            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('channelOwner_slide2_text'))}`,
            `./anim/screen-achive.png`,
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('channelOwner_slide3_text'))}`,

            `./anim/screen-monetization.png`,
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('channelOwner_slide4_text'))}`,
            `https://placehold.co/600x1000/2a333c/ffffff?text=${encodeURIComponent(t('channelOwner_slide5_text'))}`,
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
                <Carousel slides={channelOwnerSlides} />
            </div>
            <div className="p-6 text-center shrink-0" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #101820)'}}>
                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--tg-theme-text-color, #ffffff)'}}>{t('channelOwner_title')}</h1>
                <p className="mb-6" style={{ color: 'var(--tg-theme-hint-color, #999999)'}}>{t('channelOwner_description')}</p>
                <button 
                    onClick={onStart} 
                    className="w-full py-3 px-4 rounded-lg font-semibold text-lg transition-transform duration-200 active:scale-95"
                    style={{ backgroundColor: 'var(--tg-theme-button-color, #5288c1)', color: 'var(--tg-theme-button-text-color, #ffffff)'}}
                >
                    {t('channelOwner_button')}
                </button>
            </div>
        </div>
    );
};

export default ChannelOwnerCarousel;