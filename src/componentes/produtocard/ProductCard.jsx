import React from 'react';
import './ProductCard.css';


function ProductCard({ image, name, oldPrice, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <p className="product-name">{name}</p>
      <div className="product-pricing">
        {oldPrice && <span className="old-price">R$ {oldPrice}</span>}
        <span className="current-price">R$ {price}</span>
      </div>
    </div>
  );
}

export default ProductCard;