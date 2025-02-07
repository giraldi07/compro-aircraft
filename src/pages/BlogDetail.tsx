import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

// Query GraphQL menggunakan idType DATABASE_ID
const GET_POST_DETAIL = gql`
  query GetPostDetail($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
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
  const { id } = useParams<{ id?: string }>(); // Ambil ID dari URL
  const postId = id ?? ""; // Pastikan `id` tidak undefined

  // Decode Base64 jika ID dalam format Base64
  let decodedId = postId;
  try {
    const decodedString = atob(postId); // Decode Base64
    const match = decodedString.match(/:(\d+)$/); // Ambil angka setelah ":"
    if (match) {
      decodedId = match[1]; // Ambil angka dari hasil decode
    }
  } catch (error) {
    console.error("Error decoding ID:", error);
  }

  // Pastikan decodedId adalah angka sebelum query
  if (!decodedId || isNaN(Number(decodedId))) {
    console.error("Invalid Post ID:", decodedId);
    return <p className="text-center">Invalid Post ID</p>;
  }

  // Ambil data post berdasarkan ID yang sudah didecode
  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: decodedId },
  });

  if (loading) return <p className="text-center">Loading...</p>;

  if (error) {
    console.error("Error fetching post data:", error);
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  if (!data || !data.post) {
    console.error("No post data found:", data);
    return <p className="text-center">Post not found</p>;
  }

  const post = data.post;

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      {/* Breadcrumb untuk navigasi */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
      </nav>

      {/* Konten Blog */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-700 dark:text-gray-300">By {post.author.node.name}</p>
      <img src={post.featuredImage?.node?.sourceUrl} alt={post.title} className="w-full my-6 rounded-lg" />
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
