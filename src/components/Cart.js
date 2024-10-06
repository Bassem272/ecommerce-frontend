import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    };
  }

  handleRemoveFromCart = (id) => {
    const updatedCart = this.state.cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.setState({ cartItems: updatedCart });
  }

  render() {
    const { cartItems } = this.state;

    return (
      <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
        <h2 className="text-2xl mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="border-b p-4">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => this.handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
        <button className="bg-blue-500 text-white px-4 py-2 mt-4">Checkout</button>
      </div>
    );
  }
}

export default Cart;
