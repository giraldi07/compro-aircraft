import { gql } from "@apollo/client";

// GraphQL Query untuk mengambil data halaman 'gallery' beserta field gallery-nya
export const GET_GALLERY_PAGE = gql`
  query GetGalleryPage {
    page(id: "32", idType: DATABASE_ID) {
      title
      content
      galleryField {
        gallery(first: 10) {  # Menggunakan "first" untuk mengambil 10 gambar pertama
          edges {
            node {
              id
              mediaItemUrl  # Ambil URL gambar
              altText       # Ambil teks alternatif
            }
          }
        }
      }
    }
  }
`;
