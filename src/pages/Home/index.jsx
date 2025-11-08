import React, { useState, useEffect } from 'react';
import './index.css'; 
import ProductList from '../../componentes/produtolist/ProductList.jsx';

function Home() {
  const [nossosProdutos, setNossosProdutos] = useState([]);
  const [novidades, setNovidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = 'https://api-1-6p1t.onrender.com'; 

    async function fetchData() {
      try {
        
     
        const response = await fetch(`${API_URL}/produtos`);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }

        const allProducts = await response.json();

        // 2. Agora, o JavaScript (React) vai separar a lista
        const produtosNormais = [];
        const produtosNovidade = [];

        for (const product of allProducts) {
          if (product.oldPrice === null) {
            // Se oldPrice for null, é um "Nosso Produto"
            produtosNormais.push(product);
          } else {
            // Se oldPrice tiver um valor, é uma "Novidade"
            produtosNovidade.push(product);
          }
        }
        
        // 3. Atualizamos os estados com as listas separadas
        setNossosProdutos(produtosNormais);
        setNovidades(produtosNovidade);
        // --- FIM DA CORREÇÃO ---

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // O array vazio [] garante que isso rode só uma vez

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
        <p>Verifique se sua API no Render está no ar.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Aviso: Se "Nossos Produtos" ainda ficar vazio,
        é porque o deploy no Render AINDA não pegou
        o seu db.json com "oldPrice": null.
        Tente forçar o deploy no Render de novo.
      */}
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