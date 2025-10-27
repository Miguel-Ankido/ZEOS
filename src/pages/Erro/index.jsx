import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Importa o arquivo CSS que faremos a seguir

function Erro() {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Página Não Encontrada</h2>
      <p className="error-message">
        Oops! A página que você está procurando não existe ou foi movida.
      </p>
      
      {/* O <Link> usa a classe "home-button" do nosso CSS */}
      <Link to="/" className="home-button">
        Voltar para a Home
      </Link>
    </div>
  );
}

// Exporta o componente como padrão
export default Erro;