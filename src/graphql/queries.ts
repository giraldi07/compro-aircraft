import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers(first: 100) {
      nodes {
        title
        customerField {
          customerLogo {
            node {
              mediaItemUrl
            }
          }
          customerName
          customerTestimonial
        }
      }
    }
  }
`;
