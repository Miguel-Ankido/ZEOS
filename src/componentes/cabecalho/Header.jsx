import React from 'react';
import './Header.css'; // <-- GARANTA QUE ESTA LINHA EXISTA!

function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        
        <div className="logo">
          <a href="/">
            {/* O "Logo ZEOS" no seu print é um <img> quebrado.
                Confirme que o caminho está correto. */}
            <img src="/images/logo.png" alt="Logo ZEOS" className="logo-img" />
          </a>
        </div>
        
        {/* A ESTRUTURA HTML DA BARRA DE PESQUISA */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <button type="button">Buscar</button>
        </div>
        
        <div className="header-actions">
          <span>Usuário</span>
          <span>Carrinho</span>
        </div>
      </div>
      
      <nav className="header-nav">
        <a href="/">Home</a>
        <a href="/sobre">Sobre</a>
        <a href="/loja">Loja</a>
        <a href="/ajuda">Ajuda</a>
      </nav>
    </header>
  );
}

export default Header;