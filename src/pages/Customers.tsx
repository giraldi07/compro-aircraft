import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import { motion } from "framer-motion";
import HeroVideo from "../components/HeroVideo";
import VideoHero from "../videos/herovid2.mp4";

type Customer = {
  title: string;
  customerField: {
    customerName: string;
    customerTestimonial: string;
    customerLogo: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
};

export function Customers() {
  const { data, loading, error } = useQuery(GET_CUSTOMERS);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Ambil data pelanggan dari GraphQL
  const customers: Customer[] = data?.customers?.nodes || [];

  // Debugging: cek jumlah data yang diambil
  console.log("Total customers:", customers.length, customers);

  return (
    <div className="dark:bg-gray-950">
      {/* Customers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Hero Video */}
        <div className="mb-6">
          <HeroVideo
            videoSrc={VideoHero}
            title="What Did They Say?"
            description="We have the best clients in the world!"
            buttonText="Get Started"
            buttonLink="/contact"
          />
        </div>

        {/* Customers List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <motion.div
                key={customer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={customer.customerField.customerLogo.node.mediaItemUrl}
                    alt={customer.customerField.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  {customer.customerField.customerName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center italic line-clamp-2">
                  "{customer.customerField.customerTestimonial}"
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No customers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
