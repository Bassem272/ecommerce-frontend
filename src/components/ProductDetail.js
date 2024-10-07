import React from "react";

class ProductDetail extends React.Component {
  render() {
    // Access the `id` from props.params passed down by the ProductDetailPage
    const { product } = this.props; // Assuming you pass the product object from the parent
    return (
      <div>
        <h1>Product Detail for: {product.name}</h1>
        <p>Price: {product.price[0].amount}</p>
        {/* <p>Colors: {product.colors.join(', ')}</p> */}
        {/* <p>Sizes: {product.sizes.join(', ')}</p> */}
        <img src={product.gallery[0].image_url} alt={product.name} />
      </div>
    );
  }
}

export default ProductDetail;
