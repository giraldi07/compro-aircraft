import { motion } from 'framer-motion';

const customers = [
  {
    id: 1,
    name: 'AirFleet Corp',
    logo: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80',
    testimonial: 'Outstanding service and quality products. A trusted partner in our operations.',
  },
  {
    id: 2,
    name: 'SkyTech Industries',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80',
    testimonial: 'Their expertise in aviation equipment has been invaluable to our business.',
  },
  {
    id: 3,
    name: 'Global Airways',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80',
    testimonial: 'Reliable, professional, and always delivering beyond expectations.',
  },
];

export function Customers() {
  return (
    <div className="py-20 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Our Customers</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trusted by leading aviation companies worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <img
                  src={customer.logo}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{customer.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center italic">
                "{customer.testimonial}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}