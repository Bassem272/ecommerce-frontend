// import React, { Component } from 'react';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import CartOverlay from './CartOverly'; // Corrected the import path for CartOverlay

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       totalItems: 0,
//       isCartOpen: false,
//       activeCategory: 'All', // New state for active category
//     };
//   }

//   componentDidMount() {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cartItems.reduce((total, item) => {
//       const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//       return total + quantity;
//     }, 0);
//     this.setState({ totalItems });
//   }

//   toggleCart = () => {
//     this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
//   };

//   closeCart = () => {
//     this.setState({ isCartOpen: false });
//   };

//   handleCategoryChange = (category) => {
//     this.setState({ activeCategory: category }); // Update active category
//     this.props.onCategoryChange(category); // Call function to update products in parent
//   };
//   render() {
//     const { cartItems } = this.props; // Get cartItems from props
//     const { isCartOpen } = this.state;
//     const {  activeCategory } = this.state;


//     // Calculate totalItems based on cartItems prop
//     const totalItems = cartItems.reduce((total, item) => {
//       const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//       return total + quantity;
//     }, 0);

//     return (
//       <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4  shadow-sm text-black font-medium text-lg">
//         {/* <div className="flex flex-row items-center w-fit h-full ml-8">
//           <button className="h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400">Tech</button>
//           <button className="h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400">Sport</button>
//           <button className="h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400">All</button>
//         </div> */}
//         <div className="flex flex-row items-center w-fit h-full ml-8">
//           {['Tech', 'Clothes', 'All'].map((category) => (
//             <button
//               key={category}
//               className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${activeCategory === category ? 'text-green-400 border-b-2 border-green-400' : ''}`}
//               onClick={() => this.handleCategoryChange(category)} // Update active category on click
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <div className="flex-1"></div>
        
//         <button 
//            data-testid='cart-btn'
//           className="relative h-full w-fit p-1 text-slate-500 hover:text-green-400 mr-12"
//           onClick={this.toggleCart}
//         >
//           <AiOutlineShoppingCart className="h-6 w-6 text-green-500" />
//           {totalItems > 0 && (
//             <span className="absolute top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {totalItems}
//             </span>
//           )}
//         </button>

//         {isCartOpen && <CartOverlay onClose={this.closeCart} />}
//       </div>
//     );
//   }
// }

// export default Header;
import React, { Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartOverlay from './CartOverly'; // Corrected the import path for CartOverlay

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalItems: 0,
      isCartOpen: false,
      activeCategory: 'All', // New state for active category
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => {
      const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
      return total + quantity;
    }, 0);
    this.setState({ totalItems });
  }

  toggleCart = () => {
    this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category }); // Update active category
    this.props.onCategoryChange(category); // Call function to update products in parent
  };

  render() {
    const { cartItems } = this.props; // Get cartItems from props
    const { isCartOpen } = this.state;
    const { activeCategory } = this.state;

    // Calculate totalItems based on cartItems prop
    const totalItems = cartItems.reduce((total, item) => {
      const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
      return total + quantity;
    }, 0);

    return (
      <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4 shadow-sm text-black font-medium text-lg">
        <div className="flex flex-row items-center w-fit h-full ml-8">
          {['Tech', 'Clothes', 'All'].map((category) => (
            <button
              key={category}
              className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${activeCategory === category ? 'text-green-400 border-b-2 border-green-400' : ''}`}
              onClick={() => this.handleCategoryChange(category)} // Update active category on click
              data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex-1"></div>

        <button 
          data-testid='cart-btn'
          className="relative h-full w-fit p-1 text-slate-500 hover:text-green-400 mr-12"
          onClick={this.toggleCart}
        >
          <AiOutlineShoppingCart className="h-6 w-6 text-green-500" />
          {totalItems > 0 && (
            <span className="absolute top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {isCartOpen && <CartOverlay onClose={this.closeCart} />}
      </div>
    );
  }
}

export default Header;
