import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

// Mendeklarasikan query
const GET_POST_DETAIL = gql`
  query GetPostDetail($id: ID!) {
    post(id: $id, idType: URI) {
      title
      content
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
`;

export function BlogDetail() {
  const { id } = useParams();  // Mengambil id dari URL params

  // Pastikan id ada dan valid sebelum lanjut
  if (!id) {
    return <p className="text-center">Post ID is missing from URL</p>;
  }

  let decodedId;
  try {
    decodedId = atob(id);  // Decode Base64 ID
    console.log("Decoded ID:", decodedId);  // Log decoded ID
  } catch (error) {
    console.error("Error decoding ID:", error);  // Jika terjadi error saat decode
    return <p className="text-center text-red-500">Error decoding Post ID</p>;
  }

  // Mengirimkan decoded ID ke query
  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: decodedId },  // Mengirimkan decoded ID ke query
  });

  if (loading) return <p className="text-center">Loading...</p>;

  if (error) {
    console.error("Error fetching post data:", error);  // Log jika terjadi error pada query
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  // Pengecekan tambahan jika data atau post belum ada
  if (!data || !data.post) {
    console.error("No post data:", data); // Log untuk debugging
    return <p className="text-center">Post not found</p>;
  }

  const post = data.post;

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-700 dark:text-gray-300">By {post.author.node.name}</p>
      <img src={post.featuredImage?.node?.sourceUrl} alt={post.title} className="w-full my-6 rounded-lg" />
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
