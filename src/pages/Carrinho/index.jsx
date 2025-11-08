import React from 'react';
import './index.css';
import { useCart } from '../../context/CartContext.jsx';
import CartItem from '../../componentes/CartItem/CartItem.jsx';
import { Link } from 'react-router-dom';

function CarrinhoPage() {
  const { cartItems, getSubtotal } = useCart();
  const subtotal = getSubtotal();

  // Simulação do frete (baseado no aviso da imagem)
  const freteGratisMinimo = 400;
  const faltaParaFrete = freteGratisMinimo - subtotal;

  return (
    <div className="cart-container">
      {/* Aviso de Frete */}
      {subtotal > 0 && subtotal < freteGratisMinimo && (
        <div className="frete-aviso">
          <strong>Aviso:</strong> Frete grátis a partir de R$ {freteGratisMinimo.toFixed(2)}. 
          Adicione mais R$ {faltaParaFrete.toFixed(2)} no carrinho para obter o cupom.
        </div>
      )}
      
      {/* Layout de 2 colunas */}
      <div className="cart-layout">
        
        {/* Coluna Esquerda: Itens */}
        <main className="cart-items-list">
          <h1>Carrinho De Compras</h1>
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio.</p>
              <Link to="/loja" className="form-button">Voltar para a Loja</Link>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </main>
        
        {/* Coluna Direita: Resumo */}
        <aside className="cart-summary">
          <h3>Resumo</h3>
          <div className="summary-row">
            <span>Subtotal | {cartItems.length} Produtos:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          {/* (Poderia adicionar "Frete" aqui) */}
          <div className="summary-total">
            <span>Total:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
        <Link to="/checkout" className="checkout-button">
            Fechar Pedido
          </Link>
        </aside>

      </div>
    </div>
  );
}

export default CarrinhoPage;