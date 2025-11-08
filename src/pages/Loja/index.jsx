import React, { useState, useEffect } from 'react';
import './index.css';
import ProductList from '../../componentes/produtolist/ProductList.jsx';
import Pagination from '../../componentes/Pagination/index.jsx';
import { toast } from 'react-toastify';

function LojaPage() {
  // 1. Estados para controlar os dados
  const [products, setProducts] = useState([]); // Produtos da página atual
  const [loading, setLoading] = useState(true);
  
  // 2. Estados para controlar a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8; // Queremos 8 por página

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com';

  // 3. Efeito que busca os produtos sempre que a 'currentPage' mudar
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 4. A mágica da paginação do json-server:
        // Ex: /produtos?_page=1&_limit=8
        const response = await fetch(
          `${API_URL}/produtos?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos');
        }

        // 5. O json-server nos diz o TOTAL de itens no Header "X-Total-Count"
        const totalCount = response.headers.get('X-Total-Count');
        // 6. Calculamos o total de páginas
        setTotalPages(Math.ceil(totalCount / itemsPerPage));

        const data = await response.json();
        setProducts(data);

      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error('Erro ao carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // 7. O 'useEffect' roda de novo se 'currentPage' mudar

  if (loading) {
    return (
      <div className="loja-container">
        <h1 className="main-title">Loja</h1>
        <p style={{ textAlign: 'center' }}>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="loja-container">
      <h1 className="main-title">Loja</h1>
      
      <div className="loja-content">
        {/* 8. Passa apenas os 8 produtos da página atual */}
        <ProductList products={products} />

        {/* 9. Passa os dados de paginação para o componente */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Passa a função para o filho
        />
      </div>
    </div>
  );
}

export default LojaPage;