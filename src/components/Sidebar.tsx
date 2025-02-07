import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; path: string }[];
}

export function Sidebar({ isOpen, onClose, navigation }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay untuk menutupi background saat sidebar terbuka */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black dark:bg-gray-900 opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar utama */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 w-64 h-screen bg-white dark:bg-gray-900 shadow-lg z-50"
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button onClick={onClose} className="text-gray-700 dark:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-md text-base font-medium transition ${
                location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}
