import React from 'react';

const StarRating = ({ rating }) => {
  // Calcula quantas estrelas cheias e meias-estrelas serão exibidas
  const fullStars = Math.floor(rating / 2);
  const halfStars = rating % 2 === 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Renderiza as estrelas
  return (
    <div>
      {Array(fullStars).fill(<span>★</span>)}
      {halfStars === 1 && <span>☆</span>}
      {Array(emptyStars).fill(<span>☆</span>)}
    </div>
  );
};

export default StarRating;
