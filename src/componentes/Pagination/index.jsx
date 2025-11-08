import React from 'react';
import './index.css';

// 1. Recebe as props da 'LojaPage'
function Pagination({ currentPage, totalPages, onPageChange }) {

  // 2. Gera os números das páginas (Lógica simples por enquanto)
  //    (A lógica para "..." é complexa, vamos fazer com números simples)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 3. Funções para mudar de página
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination">
      {/* 4. Botão de Anterior (desabilitado se for a pág 1) */}
      <button 
        onClick={handlePrev} 
        className="page-link" 
        disabled={currentPage === 1}
      >
        &laquo; Anterior
      </button>

      {/* 5. Mostra os números */}
      {/* (Para 60 páginas, isso fica muito grande. 
          O ideal é mostrar só alguns números, mas vamos começar assim) */}
      {pageNumbers.map(number => (
        <a 
          key={number} 
          href="#" 
          className={`page-link ${number === currentPage ? 'current' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(number);
          }}
        >
          {number}
        </a>
      ))}

      {/* 6. Botão de Próximo (desabilitado se for a última pág) */}
      <button 
        onClick={handleNext} 
        className="page-link" 
        disabled={currentPage === totalPages}
      >
        Próximo &raquo;
      </button>
    </nav>
  );
}

export default Pagination;