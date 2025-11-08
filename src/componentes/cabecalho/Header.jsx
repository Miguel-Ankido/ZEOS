import React, { useState, useEffect } from 'react'; // 1. Importe o useState e useEffect
import './Header.css';
// 2. Importe o novo ícone (usei FaTools, mas pode ser FaCogs, etc.)
import { FaUser, FaShoppingCart, FaTools } from 'react-icons/fa';

function Header() {
  // 3. Estado para saber se o usuário é admin
  const [isAdmin, setIsAdmin] = useState(false);

  // 4. Efeito que roda UMA VEZ quando o componente carrega
  useEffect(() => {
    // Busca o "token" do usuário no localStorage
    const userData = localStorage.getItem('user');
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Se o usuário tiver a flag "isAdmin", atualiza o estado
      if (parsedUser.isAdmin) {
        setIsAdmin(true);
      }
    }
    // (Se não houver usuário, 'isAdmin' continua 'false')
  }, []); // O '[]' faz isso rodar só uma vez

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
          
          <a href="/perfil" className="action-link">
            <FaUser />
          
          </a>

          <a href="/carrinho" className="action-link">
            <FaShoppingCart />
        
          </a>

          {/* --- 5. O NOVO BOTÃO DE ADMIN --- */}
          {/* Ele só aparece se 'isAdmin' for 'true' */}
          {isAdmin && (
            <a href="/admin/editar-produto" className="action-link admin-link">
              <FaTools />
              <span>Editar</span>
            </a>
          )}
          {/* --- FIM DO NOVO BOTÃO --- */}

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