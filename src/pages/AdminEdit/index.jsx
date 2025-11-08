import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Importe o Link
import { toast } from 'react-toastify';
import './index.css';

function AdminEditPage() {
  const [allProducts, setAllProducts] = useState([]); // Lista para o dropdown
  const [selectedProductId, setSelectedProductId] = useState(''); // ID do produto a editar
  
  // O estado do formulário (todos os campos do produto)
  const [formData, setFormData] = useState(null); // Começa como null

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com';

  // 1. Busca TODOS os produtos (só uma vez, para o dropdown)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/produtos`);
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        toast.error('Falha ao carregar lista de produtos.');
      }
    };
    fetchAllProducts();
  }, []);

  // 2. Quando o admin SELECIONA um produto no dropdown...
  useEffect(() => {
    if (!selectedProductId) {
      setFormData(null); // Limpa o formulário se nada estiver selecionado
      return;
    }
    // Encontra o produto na lista e preenche o formulário
    const productToEdit = allProducts.find(p => p.id === selectedProductId);
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [selectedProductId, allProducts]);

  // 3. Função genérica para atualizar o formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // 4. Função para SALVAR as mudanças (PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      toast.warn('Selecione um produto para editar.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos/${selectedProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Produto atualizado com sucesso!');
        setAllProducts(prevProducts => 
          prevProducts.map(p => 
            p.id === selectedProductId ? formData : p
          )
        );
      } else {
        throw new Error('Falha ao atualizar o produto');
      }
    } catch (error) {
      toast.error('Erro ao salvar: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="main-title">Alterar Informações do Produto</h1>

      <div className="admin-content-box">
        
        {/* --- ESTA PARTE ESTAVA FALTANDO --- */}
        <div className="admin-nav-links">
          <Link to="/admin/adicionar-produto">
            + Adicionar Novo Produto
          </Link>
        </div>

        {/* SELETOR DE PRODUTO (O DROPDOWN) */}
        <div className="product-selector">
          <label htmlFor="product-select">Selecione um Produto para Editar:</label>
          <select 
            id="product-select"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">-- Escolha um produto --</option>
            {allProducts.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (ID: {product.id})
              </option>
            ))}
          </select>
        </div>
        {/* --- FIM DA PARTE QUE FALTAVA --- */}


        {/* FORMULÁRIO DE EDIÇÃO (só aparece se um produto for selecionado) */}
        {formData && (
          <form className="admin-form" onSubmit={handleSubmit}>
            
            <div className="form-column">
              <label>Nome do Produto</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} />
              
              <label>Preço Antigo (Ex: 239,99 ou deixe null)</label>
              <input type="text" name="oldPrice" value={formData.oldPrice || ''} onChange={handleFormChange} />
              
              <label>Preço Atual (Ex: 159,90)</label>
              <input type="text" name="price" value={formData.price} onChange={handleFormChange} />

              <label>Estoque (Número)</label>
              <input type="number" name="estoque" value={formData.estoque} onChange={handleFormChange} />
              
              <label>SKU (Ex: z001)</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleFormChange} />

              <label>Categoria (Ex: CAMISAS)</label>
              <input type="text" name="categoria" value={formData.categoria} onChange={handleFormChange} />
              
              <label>Caminho da Imagem (Ex: /images/camisa.png)</label>
              <input type="text" name="image" value={formData.image} onChange={handleFormChange} />
            </div>

            <div className="form-column">
              <label>Descrição Curta</label>
              <textarea name="descricao_curta" value={formData.descricao_curta} onChange={handleFormChange} rows="5"></textarea>

              <label>Descrição Completa (Longa)</label>
              <textarea name="descricao_longa" value={formData.descricao_longa} onChange={handleFormChange} rows="10"></textarea>

              <label>Material (Ex: 100% Algodão)</label>
              <input type="text" name="material" value={formData.material} onChange={handleFormChange} />

              <button type="submit" className="admin-save-button">
                Salvar Alterações
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default AdminEditPage;