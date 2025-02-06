import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

// Query GraphQL untuk mengambil data halaman 'gallery'
const GET_GALLERY_PAGE = gql`
  query GetGalleryPage {
    page(id: "gallery", idType: URI) {
      title
      content
    }
  }
`;

export function Gallery() {
  const { loading, error, data } = useQuery(GET_GALLERY_PAGE);
  const [galleryItems, setGalleryItems] = useState<{ src: string; alt: string }[]>([]);
  const [filteredContent, setFilteredContent] = useState<string>("");

  useEffect(() => {
    if (data?.page?.content) {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data.page.content, "text/html");

      // Mengambil semua elemen <img> dan menyimpan src serta alt-nya
      const images = Array.from(htmlDoc.querySelectorAll("img")).map((img) => ({
        src: img.src,
        alt: img.getAttribute("alt")?.trim() || "", // Ambil alt dengan getAttribute agar tidak undefined
      }));
      setGalleryItems(images);

      // Membersihkan teks dari elemen yang tidak diperlukan
      const cleanContent = data.page.content.replace(
        /<(figure|img|gallery|iframe|script|style)[^>]*>.*?<\/\1>/gs,
        ""
      );
      setFilteredContent(cleanContent);
    }
  }, [data]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {data.page.title}
          </h1>
          <div
            className="text-xl prose prose-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: filteredContent }}
          />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Image Container */}
              <div className="rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800 relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hanya tampilkan teks jika alt tidak kosong */}
                {item.alt && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white text-lg font-medium p-4">{item.alt}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
