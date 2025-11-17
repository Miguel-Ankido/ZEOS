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

  // 4. Função que roda quando o formulário é enviado
  const handleSearch = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (!searchTerm.trim()) {
      return; // Não faz nada se a busca estiver vazia
    }
    // 5. Redireciona para a página de busca com o termo
    navigate(`/busca?q=${searchTerm}`);
    setSearchTerm(''); // Limpa a barra
  };

  return (
    <header className="app-header">
      <div className="header-top">
        
        <div className="logo">
          {/* (Note: O logo deve ser um <Link> e não <a href> para
              não recarregar a página. Vou manter <a> por enquanto) */}
          <a href="/">
            <img src="/images/logo.png" alt="Logo ZEOS" className="logo-img" />
          </a>
        </div>
        
        {/* 6. Transforme o <div> em <form> */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar..."
            value={searchTerm} // 7. Conecte o estado
            onChange={(e) => setSearchTerm(e.target.value)} // 8. Atualize o estado
          />
          <button type="submit">Buscar</button> {/* 9. type="submit" */}
        </form>
        
        <div className="header-actions">
          {/* (Links de Usuário, Carrinho, Admin...) */}
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