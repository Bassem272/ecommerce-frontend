// import { gql } from '@apollo/client';

// // Define the GraphQL mutation for creating an order
// // eslint-disable-next-line no-unused-vars
// export const CREATE_ORDER = gql`
//   mutation CreateOrder($items: [CartItemInput!]!, $userId: String!) {
//     createOrder(items: $items, userId: $userId) {
//       orderId
//       status
//       totalAmount
//     }
//   }
// `;
import { gql } from '@apollo/client';

// Define the GraphQL mutation for creating an order
// eslint-disable-next-line no-unused-vars
export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!, $userId: String!) {
    createOrder(items: $items, userId: $userId) {
      orderId
      orderTotal
      orderTime
    #   items {
    #     productId
    #     name
    #     price
    #     quantity
    #     selectedAttributes
    #     gallery
    #     categoryId
    #     inStock
    #   }
    }
  }
`;
