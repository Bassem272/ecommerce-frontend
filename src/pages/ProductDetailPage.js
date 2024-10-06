import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import ProductDetail from '../components/ProductDetail';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      colors
      sizes
      imageUrl
    }
  }
`;

class ProductDetailPage extends Component {
  handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Added to cart');
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <Query query={GET_PRODUCT} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          const product = data.product;

          return (
            <div>
              <ProductDetail product={product} />
              <button 
                className="bg-blue-500 text-white px-4 py-2 mt-4" 
                onClick={() => this.handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductDetailPage;
