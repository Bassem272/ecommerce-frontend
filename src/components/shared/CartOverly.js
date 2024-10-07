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

  <div className="w-auto bg-green-100 h-5/6 p-4 shadow-lg relative z-50 bg">
    <button className="absolute top-2 right-2 text-red-500" onClick={onClose}>
      <i className="fas fa-times"></i>
    </button>
    <h2 className="text-sm font-semibold mb-4">My Bag: {totalItems} {totalItems > 1 ? 'Items' : 'Item'}</h2>

    <div className="overflow-y-auto max-h-64 bg-slate-50">
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between mb-2 border bg-white p-2">
          {/* Left side: Product details */}
          <div className="flex flex-col justify-between w-2/3 pr-2">
            <div className="flex flex-col justify-start h-full">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className='text-sm'>${item.price[0].amount}</p>

              {/* Display attributes below the product */}
              {item.attributes.length > 0 && (
                <div
                  data-testid={`cart-item-attribute-${item.name.toLowerCase().replace(/\s+/g, '-')}`} // Added data-testid
                >
                  <ProductAttributes
                    attributes={item.attributes}
                    onAttributeChange={(selectedAttributes) => this.handleAttributeChange(item.id, selectedAttributes)}
                    isCartItem={true} // Indicate that this is from CartOverlay
                 />
                </div>
              )}
            </div>
          </div>

          {/* Right side: Image and Quantity controls */}
          <div className="w-1/3 flex flex-col items-center justify-between">
            <div className="flex items-center mb-2">
              {/* Quantity controls */}
              <div className="flex flex-col items-center mr-2 ">
                <button data-testid='cart-item-amount-increase' onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity + 1)}>
                  <CiSquarePlus />
                </button>
                <span data-testid='cart-item-amount' >{item.quantity ? item.quantity : 1}</span>
                <button data-testid='cart-item-amount-decrease' onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity - 1)}>
                  <CiSquareMinus />
                </button>
              </div>

              {/* Image */}
              <img 
                src={item.gallery[0].image_url} 
                alt={item.name} 
                className="w-20 h-20 object-cover border-y-2 border-red-400" 
                style={{ maxHeight: '120px' }} 
              />
            </div>
            <button className="text-xs mt-2" onClick={() => this.handleRemoveFromCart(item.id, item.selectedAttributes)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>

    <div data-testid='cart-total' className="flex justify-between mt-4">
      <div className="text-left font-semibold">
        Total: 
      </div>
      <div data-testid='cart-total' className="text-right font-semibold">
        ${this.getTotalPrice().toFixed(2)}
      </div>
    </div>

    <button
      onClick={this.handlePlaceOrder}
      className="w-full bg-green-500 text-white py-2 mt-2"
    >
      Place Order
    </button>
  </div>
</div>

//         <div className="fixed inset-0 flex justify-end" style={{ top: '64px', zIndex: 1000 }}>
//   {/* Overlay to darken the background */}
//   <div className="absolute inset-0 bg-black bg-opacity-20" onClick={onClose} />

//   <div className="w-auto bg-green-100 h-5/6 p-4 shadow-lg relative z-50 bg">
//   <button className="absolute top-2 right-2 text-red-500" onClick={onClose}>
//     <i className="fas fa-times"></i>
//   </button>
//   <h2 className="text-sm font-semibold mb-4">My Bag: {totalItems} {totalItems > 1 ? 'Items' : 'Item'}</h2>
  
//   <div className="overflow-y-auto max-h-64 bg-slate-50">
//     {cartItems.map((item, index) => (
//       <div key={index} className="flex justify-between mb-2 border bg-white p-2">
//         {/* Left side: Product details */}
//         <div className="flex flex-col justify-between w-2/3 pr-2">
//           <div className="flex flex-col justify-start h-full">
//             <h3 className="text-sm font-semibold">{item.name}</h3>
//             <p className='text-sm'>${item.price[0].amount}</p>

//             {/* Display attributes below the product */}
//             {item.attributes.length > 0 && (
//               <ProductAttributes
//                 attributes={item.attributes}
//                 onAttributeChange={(selectedAttributes) => this.handleAttributeChange(item.id, selectedAttributes)}
//               />
//             )}
//           </div>
//         </div>

//         {/* Right side: Image and Quantity controls */}
//         <div className="w-1/3 flex flex-col items-center justify-between">
//           <div className="flex items-center mb-2">
//             {/* Quantity controls */}
//             <div className="flex flex-col items-center mr-2 ">
//               <button data-testid='cart-item-amount-increase' onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity + 1)}>
//                 <CiSquarePlus />
//               </button>
//               <span data-testid='cart-item-amount' >{item.quantity ? item.quantity : 1}</span>
//               <button data-testid='cart-item-amount-decrease' onClick={() => this.handleUpdateQuantity(item.id, item.selectedAttributes, item.quantity - 1)}>
//                 <CiSquareMinus />
//               </button>
//             </div>

//             {/* Image */}
//             <img 
//               src={item.gallery[0].image_url} 
//               alt={item.name} 
//               className="w-20 h-20 object-cover border-y-2 border-red-400" 
//               style={{ maxHeight: '120px' }} 
//             />
//           </div>
//           <button className="text-xs mt-2" onClick={() => this.handleRemoveFromCart(item.id, item.selectedAttributes)}>
//             Remove
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>

//   <div  data-testid='cart-total' className="flex justify-between mt-4">
//     <div className="text-left font-semibold">
//       Total: 
//     </div>
//     <div data-testid='cart-total' className="text-right font-semibold">
//       ${this.getTotalPrice().toFixed(2)}
//     </div>
//   </div>

//   <button
//     onClick={this.handlePlaceOrder}
//     className="w-full bg-green-500 text-white py-2 mt-2"
//   >
//     Place Order
//   </button>
// </div>


// </div>

    );
  }
}

export default CartOverlay;
