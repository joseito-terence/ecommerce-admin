import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ViewImages.css";

function ViewImages() {
  const images = useSelector(state => state.productImages);
  const [mainImage, setMainImage] = useState('');

  const viewProduct = (index) => {
    setMainImage(images[index]);
  };

  useEffect(() => {
    if(images.length)
      setMainImage(images[0]);
  }, [images])

  return (
    <div className="product__images-display">
      <div className="product__images-main">
        <img
          src={mainImage}
          alt="Product"
        />
      </div>
      
      <div className="product__images-sub">
        {images.map((image, index) => (
          <img key={index} alt={index} src={image} onClick={() => viewProduct(index)} /> 
        ))}
      </div>
    </div>
  );
}

export default ViewImages;
