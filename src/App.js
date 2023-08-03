import React, { useState, useEffect } from "react";
import axios from "axios";
import MyGallery from "./image-gallery";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const BASE_URL = "http://localhost:5000";

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/photos?page=${page}`);
      const { photos, currentPage, totalPages } = response.data;
      console.log(photos);
      setPhotos(photos);
      setCurrentPage(currentPage);
      console.log(currentPage);
      setTotalPages(totalPages);
      console.log(totalPages);
      return photos;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAllPhotos = async () => {
      let allFetchedPhotos = [];

      for (let page = 1; page <= totalPages; page++) {
        const photosFromPage = await fetchPhotos(page);
        allFetchedPhotos = [...allFetchedPhotos, ...photosFromPage];
      }

      setAllPhotos(allFetchedPhotos);
    };

    fetchAllPhotos();
  }, [totalPages]);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`page changed to ${page}`);
  };

  const handleImageClick = (image, index) => {
    setShowPopup(true);
    // setSelectedImage(image);
    setCurrentIndex(index);
  };
  const closeModal = () => {
    setShowPopup(false);
  };
  return (
    <div>
      {showPopup ? (
        <div className="modal">
          <div className="top">
            <h1 className="heading">Photo Slide Show</h1>
            <button className="button" onClick={closeModal}>
              close
            </button>
          </div>

          <MyGallery items={photos} currentIndex={currentIndex} />

          <div className="pagination" style={{ display: "flex" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                className="button"
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
              >
                Page:{page}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="main">
          <h1>All Photos</h1>
          <div className="displayAll">
            {allPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo.imageUrl}
                alt={`Images ${index + 1}`}
                onClick={() => handleImageClick(photo, index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
