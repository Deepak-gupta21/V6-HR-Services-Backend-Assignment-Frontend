// MyGallery.js
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ items, currentIndex }) => {
  const formattedItems = items.map((item) => ({
    original: item.imageUrl,
    thumbnail: item.imageUrl,
  }));

  return <ImageGallery items={formattedItems} startIndex={currentIndex} />;
};

export default MyGallery;
