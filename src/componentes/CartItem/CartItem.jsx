import React from 'react';
import { useCart } from '../../context/CartContext.jsx';
import './CartItem.css';

function CartItem({ item }) {
  const { addToCart, decrementItem, removeFromCart } = useCart();

  // O 'addToCart' do contexto já sabe lidar com o 'item'
  const handleIncrease = () => {
    addToCart(item, 1); // Adiciona 1
  };
  
  const handleDecrease = () => {
    decrementItem(item.id); // Remove 1
  };

  const handleRemove = () => {
    removeFromCart(item.id); // Remove todos
  };

  // Define a classe CSS com base no estoque
  const stockClass = item.estoque > 0 ? 'in-stock' : 'out-of-stock';
  const stockText = item.estoque > 0 ? 'Em estoque' : 'Fora de Estoque';

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        
        {/* Usamos o 'estoque' do produto (se não tiver, diz "Em estoque") */}
        <span className={`cart-item-stock ${stockClass}`}>
          {item.estoque ? stockText : 'Em estoque'}
        </span>
        
        <span className="cart-item-option">Opção de presente: "Indisponível"</span>
        
        {/* Mostra o seletor de quantidade */}
        {item.estoque > 0 ? (
          <div className="cart-quantity-selector">
            <button onClick={handleDecrease}>-</button>
            <input type="text" value={item.quantity} readOnly />
            <button onClick={handleIncrease}>+</button>
          </div>
        ) : (
          <div className="cart-quantity-selector">
            <input type="text" value="0" readOnly />
          </div>
        )}
      </div>
      <div className="cart-item-price">
        R$ {item.price}
      </div>
      <button onClick={handleRemove} className="cart-item-remove">×</button>
    </div>
  );
}

export default CartItem;