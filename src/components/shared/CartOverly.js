import React, { Component } from 'react';
import { CiSquarePlus , CiSquareMinus } from "react-icons/ci";
import ProductAttributes from './../ProductAttributes'; // Assuming you have the ProductAttributes component

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      totalItems :0,
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => {
      const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
      return total + quantity;
    }, 0);
    this.setState({ totalItems });
    
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  handleRemoveFromCart = (productId, selectedAttributes) => {
    const updatedCart = this.state.cartItems.filter(
      (item) => !(item.id === productId && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes))
    );
    this.setState({ cartItems: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  handleUpdateQuantity = (productId, selectedAttributes, quantity) => {
    const updatedCart = this.state.cartItems.map((item) =>
      item.id === productId && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    this.setState({ cartItems: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  handleAttributeChange = (productId, selectedAttributes) => {
    const updatedCart = this.state.cartItems.map((item) =>
      item.id === productId
        ? { ...item, selectedAttributes: { ...item.selectedAttributes, ...selectedAttributes } }
        : item
    );
    this.setState({ cartItems: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  getTotalPrice = () => {
    return this.state.cartItems.reduce((total, item) => total + item.price[0].amount * item.quantity, 0);
  };
 
  handlePlaceOrder = () => { 
    const currentTime = new Date().toLocaleTimeString();
    console.log('Placing order:', this.state.cartItems);
    const order = {
        ...this.state.cartItems,
        orderTotal:this.getTotalPrice().toFixed(2),
        orderTime : currentTime,

    }
    console.log('Order placed successfully!', order, currentTime)
    alert('Order placed succey!');
  };

  render() {
    const { cartItems , totalItems } = this.state;
    const { onClose } = this.props;

    return (
      <div className="fixed inset-0 flex justify-end" style={{ top: '64px', zIndex: 1000 }}>
        {/* Overlay to darken the background */}
        <div className="absolute inset-0 bg-black bg-opacity-20" onClick={onClose} />

        <div className="w-1/5 bg-white h-auto p-4 shadow-lg relative z-50">
          <button className="absolute top-2 right-2 text-red-500" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <h2 className="text-xl font-semibold mb-4">My Bag: {totalItems} {totalItems > 1 ? 'Items' : 'Item'}</h2>
          <div className="overflow-y-auto max-h-64">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
               
                <div className="flex flex-col">
                  <h3 className="text-sm">{item.name}</h3>
                  <p>${item.price[0].amount}</p>

                  {/* Display attributes below the product */}
                  {item.attributes.length > 0 && (
                    <ProductAttributes
                      attributes={item.attributes}
                      onAttributeChange={(selectedAttributes) => this.handleAttributeChange(item.id, selectedAttributes)}
                    />
                  )}

                  {/* Display selected attributes */}
                  {item.selectedAttributes && (
                    <div>
                      {Object.keys(item.selectedAttributes).map((key) => (
                        <p key={key}>{key}: {item.selectedAttributes[key]}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <button onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity + 1)} ><CiSquarePlus/> </button>
                  {item.quantity ? item.quantity : 1}
                  <button onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity - 1)}><CiSquareMinus/> </button>
                  <button onClick={() => this.handleRemoveFromCart(item.id, item.selectedAttributes)}>Remove</button>
                </div>
                <img src={item.gallery[0].image_url} alt={item.name} className="w-16 h-16" />
              </div>
            ))}
          </div>
          <div className="text-right font-semibold mt-4">
            Total: ${this.getTotalPrice().toFixed(2)}
          </div>
          <button
            onClick={this.handlePlaceOrder}
            className="w-full bg-green-500 text-white py-2 mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
