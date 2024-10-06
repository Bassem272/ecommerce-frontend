import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import ProductCard from '../components/ProductCard';

// GraphQL query to fetch products
const GET_PRODUCTS = gql`
  query  {
    products {
      id
      name
    
    }
  }
`;

class ProductListPage extends Component {
  render() {
    return (
      <div className="container mx-auto p-5">
         list page is here
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            // Debugging: Log the loading, error, and data states
            console.log("Loading:", loading);
            console.log("Error:", error);
            console.log("Data:", data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
        
            return (
              <div className="grid grid-cols-3 gap-6">
               
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
