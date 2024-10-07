
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';

class ProductCard extends Component {
  // Function to handle adding product to the cart
  handleAddToCart = () => {

    const { product, addToCart } = this.props; // Destructure addToCart from props
    console.log("product", product );
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      ...product,
      quantity: 1,
      selectedAttributes: product.attributes.length > 0 ? product.attributes[0].attribute_items[0]: {} // Assuming attribute_items is what you want to access
    };
    
    console.log(productToAdd)
    
    cart.push(productToAdd); // Add the product to the cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
    addToCart(productToAdd); // Call the addToCart method passed from ProductListPage
    console.log(`${product.name} added to cart`);
  };

  render() {
    const { product } = this.props;

    return (
      <div className="relative border  shadow-md p-4 group transition-transform transform hover:scale-105">
        
        {/* Product Image Container with Fixed Dimensions */}
        <div className="p-4 w-full h-60 relative bg-white">
          {/* Product Image */} 
          <Link 
          to={`/product/${product.id}`} 
        >
          <img
            src={product.gallery[0].image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/path/to/placeholder-image.png'; }} // Fallback image
          />
           </Link>
             {/* Overlay for Out of Stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black opacity-10 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Out of Stock</span>
            </div>
          )}
          {/* Cart Icon (appears on hover) */}
          <div
            className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-2 cursor-pointer
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={this.handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart />
          </div>
        </div>

        {/* Product Name */}
        <h2 className="text-xl mt-2">{product.name}</h2>
        {/* Product Price */}
        <p className="text-gray-700">
          ${product.price[0].amount.toFixed(2)}
        </p>

      </div>
    );
  }
}

export default ProductCard;
