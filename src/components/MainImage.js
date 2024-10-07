
import React from 'react';

const MainImage = ({ gallery, currentImageIndex, nextImage, prevImage }) => {
  return (
    <div className="col-span-4 relative">
      <img
        src={gallery[currentImageIndex].image_url}
        alt="Main Product"
        className="w-full h-full object-cover"
      />
      {/* Navigation Arrows */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2"
        onClick={prevImage}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2"
        onClick={nextImage}
      >
        &gt;
      </button>
    </div>
  );
};

export default MainImage;
