import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Hook para ler a URL
import { toast } from 'react-toastify';
import './index.css';
import ProductList from '../../componentes/produtolist/ProductList.jsx'; // 2. Reutilize seu ProductList!

function BuscaPage() {
  // 3. Pega os parâmetros da URL (ex: ?q=chico)
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q'); // Pega o valor de 'q'

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com';

  // 4. Busca na API sempre que o 'searchTerm' mudar
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        // 5. A mágica do json-server:
        //    O '?q=' faz uma busca full-text em TODOS os campos.
        const response = await fetch(`${API_URL}/produtos?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Erro ao buscar:", error);
        toast.error("Erro ao carregar resultados da busca.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]); // Roda de novo se a busca mudar

  if (loading) {
    return (
      <div className="busca-container">
        <h1 className="main-title">Buscando...</h1>
      </div>
    );
  }

  return (
    <div className="busca-container">
      {/* 6. Título dinâmico */}
      <h1 className="main-title">
        Resultados para: "{searchTerm}"
      </h1>
      
      <div className="busca-content">
        {results.length === 0 ? (
          <p className="no-results">Nenhum produto encontrado.</p>
        ) : (
          // 7. Reutiliza o ProductList para mostrar os resultados
          <ProductList products={results} />
        )}
      </div>
    </div>
  );
}

export default BuscaPage;