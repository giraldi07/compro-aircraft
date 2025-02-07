import { SiEmirates, SiQatarairways, SiSingaporeairlines, SiTurkishairlines, SiBritishairways, SiLufthansa, SiAirfrance } from 'react-icons/si';
import { motion } from 'framer-motion';

export function BrandIconSection() {
  const brands = [
    { icon: <SiEmirates />, name: 'Emirates' },
    { icon: <SiQatarairways />, name: 'Qatar Airways' },
    { icon: <SiSingaporeairlines />, name: 'Singapore Airlines' },
    { icon: <SiTurkishairlines />, name: 'Turkish Airlines' },
    { icon: <SiBritishairways />, name: 'British Airways' },
    { icon: <SiLufthansa />, name: 'Lufthansa' },
    { icon: <SiAirfrance />, name: 'Air France' },
  ];

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-12"
        >
          Trusted Airlines
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:mb-24 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.2, y: -5 }} // Hover effect: Membesar & naik sedikit
              whileTap={{ scale: 0.9 }} // Ketika diklik sedikit mengecil
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <motion.div
                className="text-5xl"
                animate={{
                  y: [0, -5, 0], // Loop naik-turun
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                {brand.icon}
              </motion.div>
              <p className="mt-2 text-sm font-medium">{brand.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
