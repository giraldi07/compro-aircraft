import { gql } from "@apollo/client";

// GraphQL Query untuk mendapatkan data layanan dari WordPress
export const GET_OUR_SERVICES_PAGE = gql`
  query {
    page(id: "37", idType: DATABASE_ID) {
      title
      content
      ourServicesFields {
        services {
          title
          description
          icon
        }
      }
    }
  }
`;