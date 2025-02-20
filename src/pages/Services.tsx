import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { Wrench, PenTool as Tool, Cog, Palette, Plane, Users, Briefcase, LucideIcon } from 'lucide-react';
import { GET_OUR_SERVICES_PAGE } from '../graphql/ourservices-queries';

type Services = {
  title: string;
  content: string;
  ourServicesFields: {
    services: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
};


// Mapping ikon berdasarkan keyword yang ada di dalam data WordPress
const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  tool: Tool,
  cog: Cog,
  palette: Palette,
  plane: Plane,
  users: Users,
  briefcase: Briefcase,
};

// Tambahkan prop `limit` untuk membatasi jumlah data yang ditampilkan
interface ServicesProps {
  limit?: number; // Prop opsional untuk membatasi jumlah layanan yang ditampilkan
}

export function Services({ limit }: ServicesProps) {
  const { loading, error, data } = useQuery(GET_OUR_SERVICES_PAGE);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading services</p>;

  // Ambil data halaman dari WordPress
  const page = data.page;
  const services = page.ourServicesFields?.services || [];

  // Jika `limit` diberikan, batasi jumlah data yang ditampilkan
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <div className="py-20 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
          <div className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </motion.div>

        {/* Render daftar layanan dari WordPress */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedServices.map((service: { title: string; description: string; icon: string }, index: number) => {
            const Icon = iconMap[service.icon] || Wrench; // Default ke Wrench jika tidak ada ikon yang cocok
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}