import React, { Component } from 'react';

class ProductDetail extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="container mx-auto p-5">
        <h1 className="text-3xl">{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
        <p className="text-xl text-gray-700">${product.price}</p>
        <div className="my-4">
          <label className="block text-gray-600">Select Color:</label>
          <select className="mt-1">
            {product.colors.map((color) => <option key={color}>{color}</option>)}
          </select>
        </div>

        <div className="my-4">
          <label className="block text-gray-600">Select Size:</label>
          <select className="mt-1">
            {product.sizes.map((size) => <option key={size}>{size}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
