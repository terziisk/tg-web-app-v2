import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Icons } from "./Icons";

export const LoadingSpinner = () => {
  const { t } = useTranslation();
  
  console.log("[LoadingSpinner] Отображаем индикатор загрузки. Версия 1.0.7");
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-screen"
    >
      <div className="flex flex-col items-center space-y-4">
        <Icons.loader className="w-12 h-12 animate-spin text-blue-500" />
        <p className="text-gray-400 text-sm">{t('loading_profile')}</p>
      </div>
    </motion.div>
  );
};