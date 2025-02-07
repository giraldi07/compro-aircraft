import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import PopupImage from "../images/bg.jpg";

const Popup: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const lastSeenPopup = sessionStorage.getItem("lastSeenPopup");
    const isSubscribed = sessionStorage.getItem("isSubscribed"); // Cek apakah sudah subscribe
    const currentTime = new Date().getTime();
    const intervalMilliseconds = 5000; // 5 detik untuk pengujian

    // Tampilkan popup hanya jika belum subscribe & interval waktu sudah lewat
    if (!isSubscribed && (!lastSeenPopup || currentTime - Number(lastSeenPopup) > intervalMilliseconds)) {
      setShowPopup(true);
      sessionStorage.setItem("lastSeenPopup", String(currentTime));
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  // Saat tombol Subscribe ditekan, simpan statusnya di sessionStorage
  const handleSubscribe = () => {
    sessionStorage.setItem("isSubscribed", "true"); // Simpan status subscribe
    setShowPopup(false); // Tutup popup
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full flex flex-col md:flex-row relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }} // Efek mengecil saat ditutup
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()} // Mencegah klik di luar menutup popup
          >
            {/* Gambar Samping */}
            <div className="md:w-1/2 w-full hidden md:block">
              <img
                src={PopupImage}
                alt="Newsletter"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Konten Popup */}
            <div className="p-6 md:w-1/2 w-full flex flex-col">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold text-black dark:text-white">
                Join Our Newsletter!
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                Get the latest updates and exclusive content straight to your inbox.
              </p>

              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 p-2 border rounded-md w-full text-black"
              />

              <button
                onClick={handleSubscribe} // Pastikan memanggil handleSubscribe
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
