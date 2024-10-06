import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="border rounded-lg shadow-md p-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-xl mt-2">{product.name}</h2>
        <p className="text-gray-700">${product.price}</p>
        <Link 
          to={`/product/${product.id}`} 
          className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block"
        >
          View Details
        </Link>
      </div>
    );
  }
}

export default ProductCard;
