import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { GET_PRODUCTS } from '../graphql/products-queries';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  productField: {
    productName: string;
    description: string;
    category: string;
    productImage?: {
      node: {
        id: string;
        sourceUrl: string;
      };
    };
  };
}

interface ProductSectionProps {
  title?: string;
  description?: string;
  limit?: number;
}

export function ProductSection({
  title = 'Latest Products',
  description = 'Check out our newest arrivals.',
  limit = 4, // Default menampilkan 4 produk
}: ProductSectionProps) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading products</p>;

  const products = data.products.nodes.slice(0, limit); // Batasi jumlah produk sesuai limit

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow scale-90 sm:scale-100"
            >
              <div className="relative h-40 sm:h-52">
                <img
                  src={product.productField.productImage?.node.sourceUrl}
                  alt={product.productField.productName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  {product.productField.category}
                </span>
              </div>
              <div className="p-3 sm:p-5">
                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{product.productField.productName}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 line-clamp-2">
                  {product.productField.description}
                </p>
                <button className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm transition">
                  View Product
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tombol "See More" */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/products"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm sm:text-lg font-semibold transition"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
  );
}
