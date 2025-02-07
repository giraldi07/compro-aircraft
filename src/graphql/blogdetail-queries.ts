import { gql } from "@apollo/client";

// Query GraphQL menggunakan idType DATABASE_ID
export const GET_POST_DETAIL = gql`
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