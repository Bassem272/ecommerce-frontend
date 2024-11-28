
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class ProductAttributes extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedAttributes: {},
//       isComplete: false, // To track if all required attributes are selected
//     };
//   }

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
//         console.log("allseelcted", allSelected)
//         console.log(this.props.onAttributeChange)
//         if (allSelected ) {
//           // Pass the full set of selected attributes to the parent
//           console.log("all selected now ")
//           this.props.onAttributeChange(this.state.selectedAttributes);
//           this.setState({ isComplete: true });
//         }
//       }
//     );
//   };

//   // Helper function to check if all attributes have been selected
//   checkIfAllAttributesSelected = () => {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;

//     // Iterate through all the attributes and ensure a value is selected for each
//     console.log( attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name)))
//     return attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name));
//   };

//   render() {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;

//     return (
//       <div>
//         {attributes.map((attr) => (
//           <div key={attr.id} className="my-4">
//             <h3 className="font-semibold mb-2">{attr.name}</h3>
//             <div className="flex space-x-2">
//               {attr.attribute_items.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => this.handleAttributeClick(attr.name, item.value)}
//                   className={`border px-3 py-1 ${
//                     selectedAttributes[attr.name] === item.value ? 'border-blue-500' : ''
//                   }`}
//                   style={
//                     attr.name.toLowerCase() === 'color'
//                       ? { backgroundColor: item.value, width: '40px', height: '40px' }
//                       : {}
//                   }
//                 >
//                   {/* Display text only if it's not a color swatch */}
//                   {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* Debugging to check if all attributes are selected */}
//         <div>
//           {/* <p>Selected Attributes: {JSON.stringify(this.state.selectedAttributes)}</p> */}
//           {/* <p>Is complete: {this.state.isComplete.toString()}</p> */}
//         </div>
//       </div>
//     );
//   }
// }

// ProductAttributes.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeSelect: PropTypes.func, // Ensure it's defined as a function
// };

// export default ProductAttributes;
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class ProductAttributes extends Component {
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

//   render() {
//     const { attributes } = this.props;
//     const { selectedAttributes } = this.state;

//     return (
//       <div>
//         {attributes.map((attr) => (
//           <div key={attr.id} className="my-4">
//             <h3 className="font-semibold mb-2">{attr.name}</h3>
//             <div className="flex space-x-2">
//               {attr.attribute_items.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => this.handleAttributeClick(attr.name, item.value)}
//                   className={`border px-3 py-1 ${
//                     selectedAttributes[attr.name] === item.value ? 'border-blue-500' : ''
//                   }`}
//                   style={
//                     attr.name.toLowerCase() === 'color'
//                       ? { backgroundColor: item.value, width: '40px', height: '40px', borderRadius: '50%' }
//                       : {}
//                   }
//                 >
//                   {/* Display text if it's not a color swatch */}
//                   {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* Debugging - to check if all attributes are selected */}
//         <div>
//           {/* <p>Selected Attributes: {JSON.stringify(this.state.selectedAttributes)}</p> */}
//           {/* <p>Is complete: {this.state.isComplete.toString()}</p> */}
//         </div>
//       </div>
//     );
//   }
// }

// ProductAttributes.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeChange: PropTypes.func.isRequired, // Ensure it's a function to handle attribute change
// };

// export default ProductAttributes;
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class ProductAttributes extends Component {
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
//     const { attributes } = this.props;
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
//                 data-testid={`cart-item-attribute-${kebabCaseName}`} // Container of the attributes
//               >
//                 <h3 className="mb-2 text-sm">{attr.name}</h3> {/* Reduced text size */}
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
//                         data-testid={`cart-item-attribute-${kebabCaseName}-${kebabCaseName}${isSelected ? '-selected' : ''}`} // Updated data-testid without attribute value
//                       >
//                         {/* Display text if it's not a color swatch */}
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

// ProductAttributes.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeChange: PropTypes.func.isRequired, // Ensure it's a function to handle attribute change
// };

// export default ProductAttributes;
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class ProductAttributes extends Component {
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

// ProductAttributes.propTypes = {
//   attributes: PropTypes.array.isRequired,
//   onAttributeChange: PropTypes.func.isRequired,
//   isCartItem: PropTypes.bool, // New prop to indicate the context
// };

// export default ProductAttributes;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      isComplete: false,
    };
    const allSelected = this.checkIfAllAttributesSelected();
    if (allSelected) {
      this.props.onAttributeChange(this.state.selectedAttributes);
      this.setState({ isComplete: true });
    }
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
        // Return true if there are no attributes to select
     if (attributes.length === 0) {
          return true;
      }
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
      <div>
        {attributes
          .filter((attr) => this.isRelevantAttribute(attr.name))
          .map((attr) => {
            const kebabCaseName = attr.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={attr.id} className="my-4" data-testid={`product-attribute-${kebabCaseName}`}>
                <h3 className="mb-2 text-sm">{attr.name}</h3>
                <div className="flex space-x-2">
                  {attr.attribute_items.map((item) => {
                    const isSelected = selectedAttributes[attr.name] === item.value;
                    return (
                      <button
                        key={item.id}
                        onClick={() => this.handleAttributeClick(attr.name, item.value)}
                        className={`border px-3 py-1 text-sm ${isSelected ? 'border-blue-500' : ''}`}
                        style={
                          attr.name.toLowerCase() === 'color'
                            ? { backgroundColor: item.value, width: '40px', height: '40px' }
                            : {}
                        }
                        data-testid={`product-attribute-${kebabCaseName}-${item.value.toLowerCase().replace(/\s+/g, '-')}${isSelected ? '-selected' : ''}`}
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

ProductAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  onAttributeChange: PropTypes.func.isRequired,
};

export default ProductAttributes;
