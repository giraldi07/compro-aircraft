import { motion } from "framer-motion";

export function HeroBlog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-16"
    >
      {/* Gambar Banner */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/1500x500" // Ganti dengan URL gambar banner yang sesuai
          alt="Blog Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      {/* Judul dan Subjudul */}
      <div className="relative text-center py-20">
        <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          Stay updated with the latest news, articles, and insights on various topics.
        </p>
      </div>
    </motion.div>
  );
}
