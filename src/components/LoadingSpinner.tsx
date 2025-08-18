import { motion } from "framer-motion";
import { Icons } from "./Icons";

export const LoadingSpinner = () => {
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
        <p className="text-gray-400 text-sm">Загружаем ваш профиль...</p>
      </div>
    </motion.div>
  );
};
