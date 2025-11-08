import React from "react";
import { Link } from "react-router-dom"; // 1. Importe o Link
import "./ProductCard.css";
import StarRating from "../StarRating/index.jsx";

// 2. Adicione 'id' na lista de props
function ProductCard({ id, image, name, oldPrice, price, rating }) {
  return (
    // 3. Embrulhe tudo em um Link que leva para a página do produto
    <Link to={`/produto/${id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>

        <StarRating rating={rating} />
        <p className="product-name">{name}</p>

        <div className="product-pricing">
          {oldPrice && <span className="old-price">R$ {oldPrice}</span>}
          <span className="current-price">R$ {price}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
