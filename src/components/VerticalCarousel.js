
import React, { Component } from 'react';

class VerticalCarousel extends Component {
  handleImageClick = (imageUrl) => {
    this.props.onSelectImage(imageUrl); // Notify the parent of the selected image
  };

  render() {
    const { gallery, selectedImage } = this.props;

    return (
      <div className="flex flex-col items-start space-y-4 h-full overflow-auto">
        {gallery.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt="Product Thumbnail"
            className={`w-16 h-16 object-cover cursor-pointer ${
              selectedImage === image.image_url ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => this.handleImageClick(image.image_url)}
          />
        ))}
      </div>
    );
  }
}

export default VerticalCarousel;
