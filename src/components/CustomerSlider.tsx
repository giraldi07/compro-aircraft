import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/customer-queries";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define TypeScript type for customer data
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

const CustomerSlider = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const customers: Customer[] = data?.customers?.nodes || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768, // Tablet and mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 568, // Tablet and mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1300, // Tablet and mobile
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 986, // Tablet and mobile
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">Our Clients</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trusted by leading aviation companies worldwide.
          </p>
        </motion.div>
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Slider {...settings}>
            {customers.map((customer, index) => (
              <div key={index} className="flex justify-center p-4">
                <div
                  className="rounded-2xl p-6 max-w-md text-center transition-all shadow-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                >
                  <img
                    src={customer.customerField.customerLogo.node.mediaItemUrl}
                    alt={customer.customerField.customerName}
                    className="h-16 w-16 object-cover mx-auto mb-4 rounded-full"
                  />
                  <h3 className="text-lg font-semibold">{customer.customerField.customerName}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-1">
                    "{customer.customerField.customerTestimonial}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerSlider;
