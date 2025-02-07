import { gql } from "@apollo/client";

// GraphQL Query to fetch About page data
export const GET_ABOUT_PAGE = gql`
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