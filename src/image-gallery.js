// MyGallery.js
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ items }) => {
  const formattedItems = items.map((item) => ({
    original: item.imageUrl,
    thumbnail: item.imageUrl,
    originalAlt: "Image", // Replace with your desired alt text
  }));

  const thumbnailWidth = 15; // Set the desired thumbnail width
  const thumbnailHeight = 10; // Set the desired thumbnail height

  return (
    <ImageGallery
      items={formattedItems}
      thumbnailWidth={thumbnailWidth}
      thumbnailHeight={thumbnailHeight}
    />
  );
};

export default MyGallery;
