import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
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
