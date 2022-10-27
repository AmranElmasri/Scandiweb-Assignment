import { gql } from "@apollo/client";

export const FETCH_CATEGORIES = gql`
  query FetchCategories {
    categories {
      name
    }
  }
`;

export const FETCH_PRODUCTS_BY_CATEGORY = gql`
  query FetchProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const FETCH_PRODUCT_BY_ID = gql`
  query FetchProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
