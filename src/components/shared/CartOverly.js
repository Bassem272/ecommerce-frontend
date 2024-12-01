import React, { Component } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import CartAttributes from "./../CartAttributes"; // Assuming you have the ProductAttributes component
import { Mutation } from "@apollo/client/react/components";
import { CREATE_ORDER } from "./../mutation"; // Import the mutation

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      totalItems: 0,
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cartItems.reduce((total, item) => {
      const quantity =
        item.quantity && typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1;
      return total + quantity;
    }, 0);
    this.setState({ totalItems });
    console.log("cart_cart_cdm_", cartItems);
    console.log("cart_totalitems_cdm", totalItems);

    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  handleRemoveFromCart = (productId, selectedAttributes) => {
    const updatedCart = this.state.cartItems.filter(
      (item) =>
        !(
          item.id === productId &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(selectedAttributes)
        )
    );
    this.setState({ cartItems: updatedCart });
    const totalItems = updatedCart.reduce((total, item) => {
      const quantity =
        item.quantity && typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1;
      return total + quantity;
    }, 0);
    this.setState({ totalItems });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("remove_cart_itme", totalItems);
    console.log("______cart_removed", updatedCart);
  };

  handleUpdateQuantity = (productId, selectedAttributes, quantity) => {
    const updatedCart = this.state.cartItems.map((item) =>
      item.id === productId &&
      JSON.stringify(item.selectedAttributes) ===
        JSON.stringify(selectedAttributes)
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    this.setState({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const totalItems = updatedCart.reduce((total, item) => {
      const quantity =
        item.quantity && typeof item.quantity === "number" && item.quantity > 0
          ? item.quantity
          : 1;
      return total + quantity;
    }, 0);
    this.setState({ totalItems });
  };

  handleAttributeChange = (productId, selectedAttributes) => {
    const updatedCart = this.state.cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            selectedAttributes: {
              ...item.selectedAttributes,
              ...selectedAttributes,
            },
          }
        : item
    );
    this.setState({ cartItems: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  getTotalPrice = () => {
    return this.state.cartItems.reduce(
      (total, item) => total + item.price[0].amount * item.quantity,
      0
    );
  };
    // const order = {
    //   ...this.state.cartItems,
    //   orderTotal: this.getTotalPrice().toFixed(2),
    //   orderTime: currentTime,
    // };
  // const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
//   handlePlaceOrder = async (createOrder) => {
//     const currentTime = new Date().toLocaleTimeString();
//     console.log("Placing order:", this.state.cartItems);

//       // Construct the order object
//   const order = {
//     items: this.state.cartItems.map(item => ({
//         productId: item.id, // Ensure this matches your mutation requirements
//         name: item.name, // Add name
//         price: item.price[0].amount,
//         quantity: item.quantity,
//         selectedAttributes: item.selectedAttributes,
//         categoryId: item.categoryId, // Add categoryId
//         inStock: item.inStock, // Add inStock
//     })),

//   };
//     try {
//       const response = await createOrder({
//         variables: { items: order, userId: "qwerererer" },
//       });
//       console.log("Order placed successfully:", response);
//     } catch (err) {
//       console.error("Error placing order:", err);
//     }
//     console.log("Order placed successfully!", order, currentTime);
//     alert("Order placed success !");
//   };
handlePlaceOrder = async (createOrder) => {
    const currentTime = new Date().toLocaleTimeString();
    console.log("Placing order:", this.state.cartItems);

    // Construct the order items array
    const items = this.state.cartItems.map(item => ({
        productId: item.id,               // Map product ID from cart
        name: item.name,                 // Include product name
        price: item.price[0].amount,     // Include price
        quantity: item.quantity,         // Include quantity
        selectedAttributes: JSON.stringify(item.selectedAttributes), // Serialize to JSON
        // gallery: item.gallery,           // Include gallery (array of URLs)
        categoryId: item.category_id,     // Include category ID
        inStock: item.inStock,           // Include stock status
    }));
    console.log("itemsssss", items)

    try {
        // Execute the createOrder mutation
        const response = await createOrder({
            variables: {
                items,           // Pass items array
                userId: "user123" // Replace with the actual user ID
            },
        });

        // Log and alert success
        console.log("Order placed successfully:", response.data.createOrder);
        alert("Order placed successfully!");
    } catch (err) {
        // Log errors
        console.error("Error placing order:", err);
        alert("Error placing order!");
    }
};

// handlePlaceOrder = async (createOrder) => {
//     const currentTime = new Date().toLocaleTimeString();

//     console.log("Placing order:", this.state.cartItems);

//     const items = this.state.cartItems.map(item => ({
//         productId: item.id, // Ensure this matches your mutation requirements
//         name: item.name, // Add name
//         price: item.price[0].amount,
//         quantity: item.quantity,
//         selectedAttributes: item.selectedAttributes,
//         categoryId: item.categoryId, // Add categoryId
//         inStock: item.inStock, // Add inStock
//     }));

//     try {
//         const response = await createOrder({
//             variables: { items, userId: "qwerererer" },
//         });
//         console.log("Order placed successfully:", response.data);
//     } catch (err) {
//         console.error("Error placing order:", err);
//     }
//     alert("Order placed success!");
// };

  render() {
    const { cartItems, totalItems } = this.state;
    const { onClose } = this.props;
    return (
      <Mutation mutation={CREATE_ORDER}>
        {(createOrder, { loading, error, data }) => {
          if (loading) return <p>Placing your order...</p>;
          if (error) return <p>Error placing order: {error.message}</p>;

          return (
            <div
              className="fixed inset-0 flex justify-end"
              style={{ top: "64px", zIndex: 1000 }}
            >
              {/* Overlay to darken the background */}
              <div
                className="absolute inset-0 bg-black bg-opacity-20"
                onClick={onClose}
              />

              {/* Sidebar Container */}
              <div className="flex flex-col bg-white h-5/6 p-4 shadow-lg relative z-50 mr-12 max-w-xs sm:max-w-sm">
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={onClose}
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Bag Header */}
                <h2 className="text-sm font-semibold mb-4">
                  My Bag: {totalItems} {totalItems > 1 ? "Items" : "Item"}
                </h2>

                {/* Scrollable Items Section */}
                <div
                  className="flex-grow overflow-y-auto overflow-x-hidden
              scrollbar-thin scrollbar-thumb-blue-500
              scrollbar-track-gray-200 p-2"
                >
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between mb-2 border bg-white p-2"
                    >
                      {/* Left side: Product details */}
                      <div className="flex flex-col justify-between w-2/3 pr-2">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="text-sm">${item.price[0].amount}</p>
                        {item.attributes.length > 0 && (
                          <CartAttributes
                            attributes={item.attributes}
                            onAttributeChange={(selectedAttributes) =>
                              this.handleAttributeChange(
                                item.id,
                                selectedAttributes
                              )
                            }
                            isCartItem={true}
                          />
                        )}
                      </div>

                      {/* Right side: Image and Quantity controls */}
                      <div className="w-2/3 flex flex-col items-center">
                        <div className="flex items-center mb-4">
                          <div className="flex flex-col items-center mr-2">
                            <button
                              className="mb-6 mt-5"
                              data-testid="cart-item-amount-increase"
                              onClick={() =>
                                this.handleUpdateQuantity(
                                  item.id,
                                  item.selectedAttributes,
                                  item.quantity + 1
                                )
                              }
                            >
                              <CiSquarePlus />
                            </button>
                            <span
                              className="mb-6"
                              data-testid="cart-item-amount"
                            >
                              {item.quantity ? item.quantity : 1}
                            </span>
                            <button
                              data-testid="cart-item-amount-decrease"
                              onClick={() =>
                                this.handleUpdateQuantity(
                                  item.id,
                                  item.selectedAttributes,
                                  item.quantity - 1
                                )
                              }
                            >
                              <CiSquareMinus />
                            </button>
                          </div>
                          <img
                            src={item.gallery[0].image_url}
                            alt={item.name}
                            className="w-26 h-33 object-cover border-y-2 border-red-400  w-full max-w-full"
                            style={{ maxHeight: "120px" }}
                          />
                        </div>
                        <button
                          className="text-xs mt-2"
                          onClick={() =>
                            this.handleRemoveFromCart(
                              item.id,
                              item.selectedAttributes
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fixed Footer Section */}
                <div className="border-t pt-4">
                  {/* Total */}
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">
                      ${this.getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={() => this.handlePlaceOrder(createOrder)}
                    className="w-full bg-green-500 text-white py-2 mt-4 rounded"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default CartOverlay;
