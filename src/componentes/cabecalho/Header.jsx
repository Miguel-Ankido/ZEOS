import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Header.css';
import { FaUser, FaShoppingCart, FaTools } from 'react-icons/fa';

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/busca?q=${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <header className="app-header">

      <div className="header-top">
        
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Logo ZEOS" className="logo-img" />
          </a>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        
        <div className="header-actions">
          <a href="/perfil" className="action-link">
            <FaUser />
          </a>
          <a href="/carrinho" className="action-link">
            <FaShoppingCart />
          </a>
          {isAdmin && (
            <a href="/admin/editar-produto" className="action-link admin-link">
              <FaTools />
            </a>
          )}
        </div>
      </div>
      
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/ajuda">Ajuda</Link>
      </nav>

    </header>
  );
}

export default Header;
