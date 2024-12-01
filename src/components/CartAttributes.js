// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class ProductAttributesCart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedAttributes: {},
//       isComplete: false, // To track if all required attributes are selected
//     };
//   }

//   // Handle attribute selection
//   handleAttributeClick = (attributeName, value) => {
//     this.setState(
//       (prevState) => ({
//         selectedAttributes: {
//           ...prevState.selectedAttributes,
//           [attributeName]: value,
//         },
//       }),
//       () => {
//         // Check if all required attributes are selected
//         const allSelected = this.checkIfAllAttributesSelected();
//         if (allSelected) {
//           // Pass the full set of selected attributes to the parent
//           this.props.onAttributeChange(this.state.selectedAttributes);
//           this.setState({ isComplete: true });
//         }
//       }
//     );
//   };

//   // Check if all attributes have been selected
//   checkIfAllAttributesSelected = () => {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;

//     // Ensure every attribute has a selected value
//     return attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name));
//   };

//   // Filter to show only relevant attribute names
//   isRelevantAttribute = (attributeName) => {
//     const relevantAttributes = ['Size', 'Color', 'Touch ID in keyboard', 'With USB 3 ports', 'Capacity'];
//     return relevantAttributes.includes(attributeName);
//   };

//   render() {
//     const { attributes, isCartItem } = this.props; // Accessing the isCartItem prop
//     const { selectedAttributes } = this.state;
  
//     return (
//       <div>
//         {attributes
//           .filter((attr) => this.isRelevantAttribute(attr.name)) // Only show relevant attributes
//           .map((attr) => {
//             const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
//             return (
//               <div 
//                 key={attr.id} 
//                 className="my-4"
//                 data-testid={isCartItem ? `cart-item-attribute-${kebabCaseName}` : `product-attribute-${kebabCaseName}`} // Dynamic data-testid
//               >
//                 <h3 className="mb-2 text-sm">{attr.name}</h3>
//                 <div className="flex space-x-2">
//                   {attr.attribute_items.map((item) => {
//                     const isSelected = selectedAttributes[attr.name] === item.value;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => this.handleAttributeClick(attr.name, item.value)}
//                         className={`border px-3 py-1 text-sm ${isSelected ? 'border-blue-500' : ''}`} 
//                         style={
//                           attr.name.toLowerCase() === 'color'
//                             ? { backgroundColor: item.value, width: '40px', height: '40px' } // Changed to square
//                             : {}
//                         }
//                         data-testid={
//                           isCartItem 
//                           ? `cart-item-attribute-${kebabCaseName}-${kebabCaseName}${isSelected ? '-selected' : ''}` // For cart options
//                           : `product-attribute-${kebabCaseName}-${item.value.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}` // For product page options
//                         }
//                       >
//                         {/* Show value unless it's a color swatch */}
//                         {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}

//         {/* Debugging - to check if all attributes are selected */}
//         <div>
//           {/* <p>Selected Attributes: {JSON.stringify(this.state.selectedAttributes)}</p> */}
//           {/* <p>Is complete: {this.state.isComplete.toString()}</p> */}
//         </div>
//       </div>
//     );
//   }
// }

// ProductAttributesCart.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeChange: PropTypes.func.isRequired,
//   isCartItem: PropTypes.bool, // New prop to indicate the context
// };

// export default ProductAttributesCart;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      isComplete: false,
    };
  }

  handleAttributeClick = (attributeName, value) => {
    this.setState(
      (prevState) => ({
        selectedAttributes: {
          ...prevState.selectedAttributes,
          [attributeName]: value,
        },
      }),
      () => {
        const allSelected = this.checkIfAllAttributesSelected();
        if (allSelected) {
          this.props.onAttributeChange(this.state.selectedAttributes);
          this.setState({ isComplete: true });
        }
      }
    );
  };

  checkIfAllAttributesSelected = () => {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;
    return attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name));
  };

  isRelevantAttribute = (attributeName) => {
    const relevantAttributes = ['Size', 'Color', 'Touch ID in keyboard', 'With USB 3 ports', 'Capacity'];
    return relevantAttributes.includes(attributeName);
  };

  render() {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;

    return (
      <div >
        
        {attributes
          .filter((attr) => this.isRelevantAttribute(attr.name))
          .map((attr) => {
            const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={attr.id} className="my-4" data-testid={`cart-item-attribute-${kebabCaseName}`}>
                <h3 className="mb-2 text-sm">{attr.name}</h3>
                <div className="flex space-x-2">
                  {attr.attribute_items.map((item) => {
                    const isSelected = selectedAttributes[attr.name] === item.value;
                    return (
                      <button
                        key={item.id}
                        onClick={() => this.handleAttributeClick(attr.name, item.value)}
                        // className={`border px-2 py-1 text-sm ${isSelected ? 'border-blue-500' : ''}`}
                        className={`border px-2 py-1 text-xs rounded ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-300 shadow-sm'}`} // Enhanced border and shadow

                        style={
                          attr.name.toLowerCase() === 'color'
                            ? { backgroundColor: item.value, width: '30px', height: '30px' }
                            : {}
                        }
                        data-testid={`cart-item-attribute-${kebabCaseName}-${item.value.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}`}
                      >
                        {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

CartAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  onAttributeChange: PropTypes.func.isRequired,
};

export default CartAttributes;
