import React from 'react';
import './ProductList.css'; 
import ProductCard from '../produtocard/ProductCard.jsx';

function ProductList({ title, products }) {
  return (
    <section className="product-list">
      {title && <h2 className="list-title">{title}</h2>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} // 1. ADICIONE ESTA LINHA (passa o ID)
            image={product.image}
            name={product.name}
            oldPrice={product.oldPrice}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;