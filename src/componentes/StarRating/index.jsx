import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './index.css';

// 1. Adicione 'onRatingChange' e 'isInteractive'
function StarRating({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  // Se não for interativo, faz o de sempre
  if (!onRatingChange) {
    if (!rating || rating === 0) return <div className="star-rating empty"></div>;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} />);
      else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<FaStarHalfAlt key={i} />);
      else stars.push(<FaRegStar key={i} />);
    }
    return <div className="star-rating">{stars}</div>;
  }

  // 2. Se FOR interativo (para o formulário)
  return (
    <div className="star-rating interactive">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(starValue)}
        >
          {/* Mostra a estrela com base no 'hover' ou no 'rating' clicado */}
          {(hoverRating || rating) >= starValue ? (
            <FaStar />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
}

export default StarRating;