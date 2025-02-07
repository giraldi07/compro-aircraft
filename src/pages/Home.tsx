import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Services } from './Services';
import { Customers } from './Customers';
import { BlogSection } from '../sections/BlogSection';
import ImageHero from "../images/bg.jpg";
import Popup from '../components/Popup';


export function Home() {
  return (
    <div>
      <Popup />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
      >

        {/* Background Image with Motion for Paralax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="w-full h-full"
            initial={{ y: "20%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={ImageHero}
              alt="Aircraft"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black opacity-60 dark:opacity-80" />
        </motion.div>

        {/* Content Section */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="text-4xl text-blue-600 dark:text-gray-100 sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6"
          >
            Your Gateway to Aviation Excellence
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl"
          >
            Leading provider of aircraft equipment, parts, and comprehensive aviation services.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-base sm:text-lg font-medium transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>



      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              We provide comprehensive solutions for all your aviation needs with expertise and dedication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Gambar di sebelah kiri */}
            <div className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Konten di sebelah kanan */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                About Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We are a leading aviation company with over 20 years of experience in providing top-notch aircraft equipment, parts, and services. Our mission is to ensure the highest standards of safety and efficiency in the aviation industry.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                With a team of certified professionals and a global network of partners, we are committed to delivering excellence in every aspect of our operations.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-base sm:text-lg font-medium text-white transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Batasi hanya 4 cards yang ditampilkan */}
          <Services limit={4} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Customers />
        </div>
      </section>

      {/* News/Blog Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSection />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Get in touch with us for any inquiries or to request a quote.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 bg-gray-50  dark:bg-gray-900 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Our Office</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                123 Aviation Street, Suite 456<br />
                Sky City, AV 7890<br />
                United States
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                Phone: +1 (234) 567-8901<br />
                Email: info@aviationcompany.com
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Send Us a Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"></textarea>
                </div>
                <button type="submit" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-base sm:text-lg font-medium text-white transition-colors">
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Expert Team',
    description: 'Our team of certified professionals ensures the highest quality service.',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Quality Assurance',
    description: 'We maintain strict quality standards for all our products and services.',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Global Network',
    description: 'Connected with leading manufacturers and suppliers worldwide.',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

