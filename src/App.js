import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyGallery from './image-gallery'; 

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const BASE_URL = 'http://localhost:5000';

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/photos?page=${page}`);
      const { photos, currentPage, totalPages } = response.data;
      console.log(photos);
      // .map(photo => ({ original: photo.imageUrl }))
      setPhotos(photos);
      setCurrentPage(currentPage);
      console.log(currentPage);
      setTotalPages(totalPages);
      console.log(totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`page changed to ${page}`);
  };
  

  return (
    <div>
      <h1 className='heading'>Photo Gallery</h1>
      <MyGallery items={photos} />

      <div className="pagination" style={{ display: 'flex' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            className='button'
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            Page:{page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
