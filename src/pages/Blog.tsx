import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { HeroBlog } from "../components/HeroBlog"; // Mengimpor Hero

// GraphQL query untuk mendapatkan posts dari WordPress
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

export function Blog() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="py-2 bg-gray-50 dark:bg-gray-950 border-b border-gray-800">
      <div className="container w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full mb-20">
          <div className="mb-10">
            <HeroBlog />
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.posts.nodes.map((post: any, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
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
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col dark:bg-gray-900">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400 flex-1 line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <div className="flex items-center justify-between mt-4">
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
        </div>

      </div>
    </div>
  );
}
