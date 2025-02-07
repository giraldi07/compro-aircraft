import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      nodes {
        id
        title
        productField {
          productName
          description
          category
          productImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
    }
  }
`;