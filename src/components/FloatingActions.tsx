import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider"; // Sesuaikan path sesuai struktur proyek
import { ArrowUp, Sun, Moon, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingActions() {
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle visibility tombol "Scroll to Top"
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll otomatis ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {/* Tombol Scroll ke Atas */}
      {isVisible && isExpanded && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      {/* Tombol Toggle Theme */}
      {isExpanded && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-all"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      )}

      {/* Tombol Utama (Berputar saat dibuka/tutup) */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{ rotate: isExpanded ? 135 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 dark:bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 transition-all"
      >
        <Settings2 size={28} />
      </motion.button>
    </div>
  );
}
