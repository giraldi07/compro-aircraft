import { motion } from 'framer-motion';
import { Star, ShieldCheck, Lightbulb } from 'lucide-react'; // Import ikon Lucide
import { useQuery, gql } from '@apollo/client'; // Import Apollo Client for GraphQL queries
import { HeroAbout } from '../components/HeroAbout';

// GraphQL Query to fetch About page data
const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "65", idType: DATABASE_ID) {
      title
      content
      aboutField {
        mission
        vision
        companyValues {
          title
          description
          icon
        }
      }
    }
  }
`;

export function About() {
  // Use Apollo's useQuery hook to fetch data from WordPress
  const { loading, error, data } = useQuery(GET_ABOUT_PAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Destructure the data fetched from GraphQL query
  const { mission, vision, companyValues } = data.page.aboutField;

  return (
    <div className="py-2 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-800 mb-10">
          <div className="mb-10">
            <HeroAbout /> {/* Ini adalah Hero yang sudah dipisahkan */}
          </div>
        </div>


        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">{mission}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400">{vision}</p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-blue-600 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value: { title: string; description: string; icon: string }, index: number) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  {/* Render icon dynamically */}
                  {value.icon === 'Star' && <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                  {value.icon === 'ShieldCheck' && <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                  {value.icon === 'Lightbulb' && <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                </div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
