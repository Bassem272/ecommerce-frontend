
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      isComplete: false, // To track if all required attributes are selected
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
        // Check if all required attributes are selected
        const allSelected = this.checkIfAllAttributesSelected();
        console.log("allseelcted", allSelected)
        console.log(this.props.onAttributeChange)
        if (allSelected ) {
          // Pass the full set of selected attributes to the parent
          console.log("all selected now ")
          this.props.onAttributeChange(this.state.selectedAttributes);
          this.setState({ isComplete: true });
        }
      }
    );
  };

  // Helper function to check if all attributes have been selected
  checkIfAllAttributesSelected = () => {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;

    // Iterate through all the attributes and ensure a value is selected for each
    console.log( attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name)))
    return attributes.every((attr) => selectedAttributes.hasOwnProperty(attr.name));
  };

  render() {
    const { attributes } = this.props;
    const { selectedAttributes } = this.state;

    return (
      <div>
        {attributes.map((attr) => (
          <div key={attr.id} className="my-4">
            <h3 className="font-semibold mb-2">{attr.name}</h3>
            <div className="flex space-x-2">
              {attr.attribute_items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => this.handleAttributeClick(attr.name, item.value)}
                  className={`border px-3 py-1 ${
                    selectedAttributes[attr.name] === item.value ? 'border-blue-500' : ''
                  }`}
                  style={
                    attr.name.toLowerCase() === 'color'
                      ? { backgroundColor: item.value, width: '40px', height: '40px' }
                      : {}
                  }
                >
                  {/* Display text only if it's not a color swatch */}
                  {attr.name.toLowerCase() !== 'color' ? item.displayValue : ''}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Debugging to check if all attributes are selected */}
        <div>
          <p>Selected Attributes: {JSON.stringify(this.state.selectedAttributes)}</p>
          <p>Is complete: {this.state.isComplete.toString()}</p>
        </div>
      </div>
    );
  }
}

ProductAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  onAttributeSelect: PropTypes.func, // Ensure it's defined as a function
};

export default ProductAttributes;
