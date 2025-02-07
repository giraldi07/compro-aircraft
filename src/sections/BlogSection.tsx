import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// GraphQL query untuk mendapatkan semua posts dari WordPress
const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export function BlogSection() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  // Ambil hanya 3 post terbaru dari data yang tersedia
  const latestPosts = data.posts.nodes.slice(0, 3);

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12"
        >
          Latest Articles
        </motion.h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {latestPosts.map((post: any) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden group"
            >
              {/* Link ke Halaman Detail */}
              <Link to={`/blog/${post.id}`} className="block">
                {/* Featured Image */}
                <div className="relative h-56 sm:h-64 md:h-48 lg:h-56 overflow-hidden">
                  <img
                    src={post.featuredImage?.node?.sourceUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      By {post.author.node.name}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        
        {/* Button untuk melihat semua blog */}
        <div className="text-center mt-10">
          <Link to="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
