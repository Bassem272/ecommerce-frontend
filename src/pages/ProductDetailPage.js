
import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import VerticalCarousel from './../components/VerticalCarousel';
import MainImage from './../components/MainImage';
import ProductAttributes from './../components/ProductAttributes';
import { withParams } from '../hoc/WithParams'; 
import parse from "html-react-parser";

const GET_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      description
      inStock
      category_id
      brand
      gallery {
        product_id
        image_url
      }
      price {
        product_id
        amount
      }
      attributes {
        id
        name
        type 
        attribute_items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      isAddToCartEnabled: false,
      currentImageIndex: 0 // Track the currently selected image index
    };
    console.log("we are here detailed ")
  }
  componentWillUnmount() {
    console.log('ProductDetailPage unmounted');
    // Perform any necessary cleanup
  }
  handleImageSelect = (imageUrl, gallery) => {
    // Ensure gallery exists
    if (!gallery) return;

    const selectedIndex = gallery.findIndex(image => image.image_url === imageUrl);
    if (selectedIndex !== -1) {
      this.setState({ currentImageIndex: selectedIndex });
    }
  };

  nextImage = (gallery) => {
    // Ensure gallery exists
    if (!gallery) return;

    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % gallery.length
    }));
  };

  prevImage = (gallery) => {
    // Ensure gallery exists
    if (!gallery) return;

    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + gallery.length) % gallery.length
    }));
  };

  handleAttributeSelection = (selectedAttributes) => {
    this.setState({
      selectedAttributes,
      isAddToCartEnabled: true // Enable Add to Cart button
    });
  };

  handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const { selectedAttributes } = this.state;

    const productInCartIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
    );

    if (productInCartIndex !== -1) {
      cart[productInCartIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        selectedAttributes: { ...selectedAttributes },
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("cart", cart)
  };

  render() {
    const { id } = this.props.params;
    const { currentImageIndex, isAddToCartEnabled } = this.state;
  
    return (
      <Query query={GET_PRODUCT} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
  
          const product = data.product;
          const gallery = product?.gallery || []; // Ensure gallery is available
  
          // Early return if product is not defined
          if (!product) {
            return <p>Product not found.</p>;
          }
  
          return (
            // <div className="grid grid-cols-3 gap-6 p-8">
            //   {/* Gallery Section */}
            //   <div className="col-span-2 grid grid-cols-5 gap-4" data-testid="product-gallery">
            //     {/* Vertical Image Carousel */}
            //     <VerticalCarousel
            //       gallery={gallery}
            //       onSelectImage={(imageUrl) => this.handleImageSelect(imageUrl, gallery)} // Pass gallery to handler
            //       selectedImage={gallery[currentImageIndex]?.image_url} // Highlight the selected image
            //     />
  
            //     {/* Main Image with Arrows */}
            //     <MainImage
            //       gallery={gallery}
            //       currentImageIndex={currentImageIndex}
            //       nextImage={() => this.nextImage(gallery)} // Pass gallery to next/prev handlers
            //       prevImage={() => this.prevImage(gallery)}
            //     />
            //   </div>
  
            //   <div className="col-span-1">
            //     {/* Product Name */}
            //     <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
  
            //     {/* Product Attributes with Specific data-testid */}
            //     <ProductAttributes
            //       attributes={product.attributes}
            //       onAttributeChange={this.handleAttributeSelection}
            //       isCartItem={false}
            //    />
  
            //     {/* Product Price */}
            //     <p className="text-xl font-semibold my-4">
            //       ${product.price[0].amount.toFixed(2)}
            //     </p>
  
            //     {/* Add to Cart Button */}
            //     <button
            //       data-testid="add-to-cart"
            //       className={`bg-green-500 text-white px-4 py-2 mt-4 w-full ${!isAddToCartEnabled ? 'disabled opacity-50' : ''} hover:bg-green-400`}
            //       onClick={() => this.handleAddToCart(product)}
            //       disabled={!isAddToCartEnabled}
            //     >
            //       {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            //     </button>
  
            //     {/* Product Description */}
            //     <div className="mt-6">
            //       <h2 className="text-lg font-bold mb-2">Description</h2>
            //       <div data-testid="product-description">{parse(product.description)}</div>
            //     </div>
            //   </div>
            // </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
  {/* Gallery Section */}
  <div
    className="md:col-span-2 grid grid-cols-1 sm:grid-cols-5 gap-4"
    data-testid="product-gallery"
  >
    {/* Vertical Image Carousel */}
    <VerticalCarousel
      gallery={gallery}
      onSelectImage={(imageUrl) => this.handleImageSelect(imageUrl, gallery)}
      selectedImage={gallery[currentImageIndex]?.image_url}
    />

    {/* Main Image with Arrows */}
    <MainImage
      gallery={gallery}
      currentImageIndex={currentImageIndex}
      nextImage={() => this.nextImage(gallery)}
      prevImage={() => this.prevImage(gallery)}
    />
  </div>

  {/* Product Details */}
  <div className="md:col-span-1">
    <h1 className="text-lg md:text-2xl font-bold mb-4">{product.name}</h1>
    <ProductAttributes
      attributes={product.attributes}
      onAttributeChange={this.handleAttributeSelection}
      isCartItem={false}
    />
    <p className="text-lg md:text-xl font-semibold my-4">
      ${product.price[0].amount.toFixed(2)}
    </p>
    <button
      data-testid="add-to-cart"
      className={`bg-green-500 text-white px-4 py-2 mt-4 w-full ${
        !isAddToCartEnabled ? 'disabled opacity-50' : ''
      } hover:bg-green-400`}
      onClick={() => this.handleAddToCart(product)}
      disabled={!isAddToCartEnabled}
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
    <div className="mt-6">
      <h2 className="text-md md:text-lg font-bold mb-2">Description</h2>
      <div data-testid="product-description">{parse(product.description)}</div>
    </div>
  </div>
</div>

          );
        }}
      </Query>
    );
  }
}

export default withParams(ProductDetailPage);
