
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

//   componentDidUpdate(prevProps, prevState) {
//     const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
//     // Compare the current cart with the previous cart stored in the state
//     if (JSON.stringify(prevState.cart) !== JSON.stringify(currentCart)) {
//       // If the cart has changed, update the state and recalculate total items
//       this.setState({ cart: currentCart }, () => {
//         //  console.log("we created updtate to the cart ")
//         this.updateTotalItems();
//       });
//     }
//   }

//   componentDidMount() {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cartItems.reduce((total, item) => {
//       const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//       return total + quantity;
//     }, 0);
//     this.setState({ totalItems });
//     this.updateTotalItems();

//   }

//   // componentDidUpdate(prevProps, prevState) {
//   //   // Fetch the current cart data from localStorage
//   //   const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
//   //   const prevCart =  prevState.cartItems || [];
//   //   console.log("header_cdu",currentCart)
//   //   console.log("header_cdu_prevcart",prevCart)
  
//   //   // Compare the current cart with the previous cart
//   //   if (JSON.stringify(prevCart) !== JSON.stringify(currentCart)) {
//   //     // If the cart has changed, recalculate the total items
//   //     this.updateTotalItems();
//   //     console.log("we called update total items")
//   //   }
//   // }
  
//   toggleCart = () => {
//     this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
//   };
//   closeCart = () => {
//     this.setState({ isCartOpen: false });
//   };
//   handleCategoryChange = (category) => {
//     this.setState({ activeCategory: category }); // Update active category
//     this.props.onCategoryChange(category); // Call function to update products in parent
//     console.log("category", category)
//     // window.location.href = '/'; // Navigate to the product list page

//   };
//   updateTotalItems = () => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cartItems.reduce((total, item) => {
//         const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//         return total + quantity;
//     }, 0);   
    
//     // console.log("se oc", cartItems)
//       // console.log("se oc", totalItems)
//       this.setState({ totalItems :totalItems});
// };
//   render() {
//     // const { cartItems } = this.props; // Get cartItems from props
//     const { isCartOpen } = this.state;
//     const { activeCategory } = this.state;
//     // Calculate totalItems based on cartItems prop
//     const { totalItems } = this.state
//     // cartItems.reduce((total, item) => {
//     //   const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//     //   return total + quantity;
//     // }, 0);
//               // console.log("hot___=++++",totalItems)
//     return (
//       <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4 shadow-sm text-black font-medium text-lg">
//         <div className="flex flex-row items-center w-fit h-full ml-8">
//           {['Tech', 'Clothes', 'All'].map((category) => (
//             <button
//               key={category}
//               className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${activeCategory === category ? 'text-green-400 border-b-2 border-green-400' : ''}`}
//               onClick={() => this.handleCategoryChange(category)} // Update active category on click
//               data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <div className="flex-1"></div>
//         <button 
//           data-testid='cart-btn'
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


// import React, { useState, useEffect } from 'react';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
// import CartOverlay from './CartOverly'; // Corrected import path for CartOverlay

// const Header = ({ onCategoryChange }) => {
//   const [totalItems, setTotalItems] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('All'); // State for active category
//   const navigate = useNavigate();

//   // Update total items when the component mounts or localStorage changes
//   useEffect(() => {
//     const updateTotalItems = () => {
//       const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//       const total = cartItems.reduce((total, item) => {
//         const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
//         return total + quantity;
//       }, 0);
//       setTotalItems(total);
//     };

//     updateTotalItems();

//     const storageListener = () => updateTotalItems();
//     window.addEventListener('storage', storageListener); // Listen to storage changes

//     return () => window.removeEventListener('storage', storageListener);
//   }, []);

//   const handleCategoryChange = (category) => {
//     setActiveCategory(category); // Update active category
//     if (onCategoryChange) {
//       onCategoryChange(category); // Call parent function if provided
//     }
//     navigate('/'); // Navigate to the ProductListPage
//   };

//   const toggleCart = () => {
//     setIsCartOpen((prev) => !prev);
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   return (
//     <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4 shadow-sm text-black font-medium text-lg">
//       <div className="flex flex-row items-center w-fit h-full ml-8">
//         {['Tech', 'Clothes', 'All'].map((category) => (
//           <button
//             key={category}
//             className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${activeCategory === category ? 'text-green-400 border-b-2 border-green-400' : ''}`}
//             onClick={() => handleCategoryChange(category)}
//             data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//       <div className="flex-1"></div>
//       <button 
//         data-testid="cart-btn"
//         className="relative h-full w-fit p-1 text-slate-500 hover:text-green-400 mr-12"
//         onClick={toggleCart}
//       >
//         <AiOutlineShoppingCart className="h-6 w-6 text-green-500" />
//         {totalItems > 0 && (
//           <span className="absolute top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {totalItems}
//           </span>
//         )}
//       </button>
//       {isCartOpen && <CartOverlay onClose={closeCart} />}
//     </div>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CartOverlay from './CartOverly'; // Correct import path for CartOverlay

const Header = ({ onCategoryChange }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All'); // State for active category
  const navigate = useNavigate();

  // Function to calculate and update total items
  const updateTotalItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((total, item) => {
      const quantity = (item.quantity && typeof item.quantity === 'number' && item.quantity > 0) ? item.quantity : 1;
      return total + quantity;
    }, 0);
    setTotalItems(total);
  };

  // Update total items when the component mounts
  useEffect(() => {
    updateTotalItems();
  }, []);

  // Listen to localStorage changes and update total items in real time
  useEffect(() => {
    const handleStorageChange = () => {
      updateTotalItems();
    };

    // Add event listener for `storage` changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Monitor total items for changes in the same tab
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    // Monkey patch `localStorage.setItem` to trigger state updates
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments); // Call the original setItem
      if (key === 'cart') {
        updateTotalItems();
      }
    };

    return () => {
      localStorage.setItem = originalSetItem; // Restore original method
    };
  }, []);

  // Handle category change and navigate to ProductListPage
  const handleCategoryChange = (category) => {
    setActiveCategory(category); // Update active category
    if (onCategoryChange) {
      onCategoryChange(category); // Call parent function if provided
    }
    navigate('/'); // Navigate to the ProductListPage
  };

  // Toggle cart overlay
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Close cart overlay
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="flex flex-row items-center w-full h-16 p-1 m-0 border-b-4 shadow-sm text-black font-medium text-lg">
      <div className="flex flex-row items-center w-fit h-full ml-8">
        {['Tech', 'Clothes', 'All'].map((category) => (
          <button
            key={category}
            className={`h-full w-fit p-1 m-2 text-slate-500 hover:text-green-400 hover:border-b-2 hover:border-green-400 ${
              activeCategory === category ? 'text-green-400 border-b-2 border-green-400' : ''
            }`}
            onClick={() => handleCategoryChange(category)}
            data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex-1"></div>
      <button
        data-testid="cart-btn"
        className="relative h-full w-fit p-1 text-slate-500 hover:text-green-400 mr-12"
        onClick={toggleCart}
      >
        <AiOutlineShoppingCart className="h-6 w-6 text-green-500" />
        {totalItems > 0 && (
          <span className="absolute top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      {isCartOpen && <CartOverlay onClose={closeCart} />}
    </div>
  );
};

export default Header;
