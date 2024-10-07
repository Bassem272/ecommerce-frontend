import React, { Component } from 'react';
import CartOverlay from './CartOverly';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalItems: 0,
      isCartOpen: false, // Manage whether the cart overlay is open
    };
  }

  componentDidMount() {
    // Calculate total items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    this.setState({ totalItems });
  }

  toggleCart = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }

  render() {
    const { totalItems, isCartOpen } = this.state;

    return (
      <div className="flex justify-between items-center w-full h-16 p-4 bg-gray-100">
        <h1 className="text-xl">Shop</h1>
        <div className="relative">
          {/* Cart Button */}
          <button onClick={this.toggleCart} className="relative text-gray-700">
            <i className="fas fa-shopping-cart text-2xl"></i> {/* Using Font Awesome for the cart icon */}
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems} {totalItems > 1 ? 'Items' : 'Item'}
              </span>
            )}
          </button>
        </div>

        {/* Cart Overlay */}
        {isCartOpen && <CartOverlay onClose={this.toggleCart} />}
      </div>
    );
  }
}

export default Header;
