import React from 'react';
// O caminho correto é "subir um nível" (../) e "entrar na pasta irmã" (produtocard)
import ProductCard from '../produtocard/ProductCard.jsx';
import './ProductList.css';

// Recebe um título e uma lista de produtos
function ProductList({ title, products }) {
  return (
    <section className="product-list">
      <h2 className="list-title">{title}</h2>
      <div className="product-grid">
        {/* Usamos o .map() para criar um Card para cada produto */}
        {products.map((product) => (
          <ProductCard
            key={product.id} // Chave é essencial para o React
            image={product.image}
            name={product.name}
            oldPrice={product.oldPrice}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;