// src/features/ManagementHeader.tsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTranslation } from 'react-i18next';

const lottieAnimations = {
  level: './anim/duck-whant-some-likes-sticker.lottie',
  analytics: './anim/duck-analitic.lottie',
  creation: './anim/duck-creation-emoji.lottie',
  achievements: './anim/duck-winner-sticker.lottie',
  monetization: './anim/duck-money-sticker.lottie',
  'my-ads': './anim/duck-vote-auction-emoji.lottie',
  'search-channels': './anim/duck-choose-emoji.lottie',
};

const LottieHeader: React.FC<{ src: string }> = ({ src }) => {
  return (
    <header className="flex flex-col items-center justify-center">
      <DotLottieReact
        src={src}
        loop
        autoplay
        style={{ height: '190px' }}
      />
    </header>
  );
};

  
const ManagementHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <LottieHeader src={lottieAnimations.level} />
      <div className="p-4 text-center text-xl font-bold">{t('management_header')}</div>
    </>
  );
};

export default ManagementHeader;