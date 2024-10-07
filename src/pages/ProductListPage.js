
import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import ProductCard from '../components/ProductCard';

// GraphQL query to fetch products
const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      inStock
      category_id
      brand
      __typename
      price {
        product_id
        amount
        __typename
      }
      gallery {
        product_id
        image_url
      }
      attributes {
        id
        name
        product_id
        type
        __typename
        attribute_items {
          id
          attribute_id
          product_id
          displayValue
          value
          __typename
        }
      }
    }
  }
`;

class ProductListPage extends Component {
  render() {
    const { addToCart, activeCategory } = this.props; // Destructure the activeCategory prop

    return (
      <div className="container mx-auto p-5">
        list page is here
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            // Convert activeCategory to lowercase for comparison
            const normalizedActiveCategory = activeCategory.toLowerCase();

            // Filter products based on the active category
            const filteredProducts = data.products.filter((product) => {
              // Convert category_id to lowercase for comparison
              const normalizedCategoryId = product.category_id.toLowerCase();
              return normalizedActiveCategory === 'all' || normalizedCategoryId === normalizedActiveCategory;
            });

            return (
              <div className="grid grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductListPage;

