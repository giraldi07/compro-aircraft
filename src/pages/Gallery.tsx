import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

// GraphQL Query untuk mengambil data halaman 'gallery' beserta field gallery-nya
const GET_GALLERY_PAGE = gql`
  query GetGalleryPage {
    page(id: "32", idType: DATABASE_ID) {
      title
      content
      galleryField {
        gallery(first: 10) {  # Menggunakan "first" untuk mengambil 10 gambar pertama
          edges {
            node {
              id
              mediaItemUrl  # Ambil URL gambar
              altText       # Ambil teks alternatif
            }
          }
        }
      }
    }
  }
`;

export function Gallery() {
  const { loading, error, data } = useQuery(GET_GALLERY_PAGE);
  const [galleryItems, setGalleryItems] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    if (data?.page?.galleryField?.gallery?.edges) {
      const images = data.page.galleryField.gallery.edges.map((edge: { node: { mediaItemUrl: any; altText: any } }) => ({
        src: edge.node.mediaItemUrl, // Gunakan mediaItemUrl untuk gambar
        alt: edge.node.altText || "", // Gunakan altText dari data ACF
      }));
      setGalleryItems(images);
    }
  }, [data]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-950">
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
            dangerouslySetInnerHTML={{ __html: data.page.content }}
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
