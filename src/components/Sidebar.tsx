import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; path: string; icon: JSX.Element }[];
}

export function Sidebar({ isOpen, onClose, navigation }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay dengan blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />

      {/* Sidebar utama */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }} // Cubic Bezier untuk transisi smooth
        className="fixed top-0 right-0 w-72 h-screen bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
      >
        {/* Header Sidebar */}
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Sidebar */}
        <div className="p-5 space-y-3 flex-1">
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-4 px-5 py-3 rounded-md text-base font-medium transition relative ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={onClose}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
