import { motion } from "framer-motion";

export function HeroAbout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[600px] flex items-center"
    >
      {/* Gambar Banner */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/1500x500" // Ganti dengan URL gambar banner yang sesuai
          alt="Blog Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>


      {/* Konten Teks */}
      <div className="relative z-10 max-w-2xl px-6 sm:px-12 lg:px-20 text-white">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          We are a trusted partner in aviation equipment and services, dedicated
          to connecting high-quality suppliers with collectors and industry
          professionals.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          With years of experience, we provide precision-crafted tools, spare
          parts, and accessories that meet global standards.
        </p>
        <p className="text-lg leading-relaxed">
          Join us in bridging the gap between technology and passion, ensuring
          excellence in every product and service.
        </p>
      </div>
    </motion.section>
  );
}
