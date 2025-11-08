import './Header.css';
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
          <a href="/perfil" className="action-link">
            <FaUser />
           
          </a>

          <a href="/carrinho" className="action-link">
            <FaShoppingCart />
          </a>
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