import React, { useState, useEffect } from 'react';
// 1. Importa o CSS da Home
import './index.css'; 

// 2. Importa o componente de Lista
// (O caminho sobe 2 níveis: 'index.jsx' -> 'Home' -> 'pages' e entra em 'componentes')
import ProductList from '../../componentes/produtolist/ProductList.jsx';

function Home() {
  const [nossosProdutos, setNossosProdutos] = useState([]);
  const [novidades, setNovidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A porta 8080 é onde seu `json-server` (npm run api) está rodando
    const API_URL = 'https://api-1-6p1t.onrender.com'; 

    async function fetchData() {
      try {
        const [produtosResponse, novidadesResponse] = await Promise.all([
          fetch(`${API_URL}/produtos`),
          fetch(`${API_URL}/novidades`)
        ]);

        if (!produtosResponse.ok || !novidadesResponse.ok) {
          throw new Error('Falha ao buscar dados da API');
        }

        const produtosData = await produtosResponse.json();
        const novidadesData = await novidadesResponse.json();

        setNossosProdutos(produtosData);
        setNovidades(novidadesData);

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container home-status">
        <h2>Carregando produtos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container home-status">
        <h2>Erro ao carregar produtos: {error}</h2>
        <p>Verifique se sua API (json-server) está rodando com `npm run api`</p>
      </div>
    );
  }

  // Renderiza as duas listas quando os dados chegam
  return (
    <div className="container">
      <ProductList 
        title="Nossos Produtos" 
        products={nossosProdutos} 
      />
      
      <ProductList 
        title="Novidades" 
        products={novidades} 
      />
    </div>
  );
}

export default Home;