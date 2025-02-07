import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import beberapa gambar untuk slideshow
import Image1 from "../images/bg.jpg";
import Image2 from "../images/bg2.jpg";
import Image3 from "../images/bg3.jpg";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Efek parallax untuk background
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Slideshow otomatis dengan transisi smooth
  const images = [Image1, Image2, Image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Kurangi opacity sebelum ganti gambar
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Pulihkan opacity setelah ganti gambar
      }, 500); // Delay sebelum mengganti gambar agar transisi lebih smooth
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full min-h-[80vh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Smooth Slideshow */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBackground }}
      >
        <img
          key={currentImageIndex} // Agar React mendeteksi perubahan gambar
          src={images[currentImageIndex]}
          alt="Aircraft"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-70" />
      </motion.div>

      {/* Content Section */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 text-white text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          Your Gateway to <br /> Aviation Excellence
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto"
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
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm sm:text-lg font-medium transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
