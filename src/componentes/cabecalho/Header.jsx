import React from 'react';
import './Header.css';
// 1. Importe os ícones que você quer.
//    "Fa" é de "Font Awesome".
import { FaUser, FaShoppingCart } from 'react-icons/fa';

function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Logo ZEOS" className="logo-img" />
          </a>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <button type="button">Buscar</button>
        </div>
        
       
        <div className="header-actions">
          <a href="/minha-conta" className="action-link" alt="Perfil">
            <FaUser />
            <span></span>
          </a>
          <a href="/carrinho" className="action-link" alt="Carrinho de Compras">
            <FaShoppingCart />
            <span></span>
          </a>
        </div>
      </div>
      
      {/* ... (resto do seu header-nav) ... */}
    </header>
  );
}

export default Header;