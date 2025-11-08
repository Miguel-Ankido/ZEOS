import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../AdminEdit/index.css'; 

const initialState = {
  name: '',
  oldPrice: null,
  price: '',
  estoque: 0,
  sku: '',
  categoria: 'CAMISAS',
  descricao_curta: '',
  descricao_longa: '',
  material: '',
  image: '/images/',
  rating: 0
};

function AdminAddPage() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com';

  // Função genérica para atualizar o formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // 3. Função para ADICIONAR (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!formData.name || !formData.price || !formData.image) {
      toast.warn('Nome, Preço e Imagem são obrigatórios.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST', // POST para criar um novo
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envia os dados do formulário
      });

      if (response.ok) {
        toast.success('Produto ADICIONADO com sucesso!');
        setFormData(initialState); // Limpa o formulário
        navigate('/admin/editar-produto'); // Manda de volta para a lista
      } else {
        throw new Error('Falha ao criar o produto');
      }
    } catch (error) {
      toast.error('Erro ao salvar: ' + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="main-title">Adicionar Novo Produto</h1>

      <div className="admin-content-box">
        {/* Link para voltar (Opcional, mas bom) */}
        <div className="admin-nav-links">
          <Link to="/admin/editar-produto">« Voltar para Edição</Link>
        </div>

        {/* 4. O formulário é idêntico ao de Edição,
            mas os 'value' vêm do 'useState' (formData) */}
        <form className="admin-form" onSubmit={handleSubmit}>
            
            <div className="form-column">
              <label>Nome do Produto</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Camisa Meme Legal" />
              
              <label>Preço Antigo (Ex: 239,99 ou deixe vazio)</label>
              <input type="text" name="oldPrice" value={formData.oldPrice || ''} onChange={handleFormChange} placeholder="null" />
              
              <label>Preço Atual (Ex: 159,90)</label>
              <input type="text" name="price" value={formData.price} onChange={handleFormChange} required placeholder="149,90" />

              <label>Estoque (Número)</label>
              <input type="number" name="estoque" value={formData.estoque} onChange={handleFormChange} />
              
              <label>SKU (Ex: z011)</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleFormChange} placeholder="z011" />

              <label>Categoria (Ex: CAMISAS)</label>
              <input type="text" name="categoria" value={formData.categoria} onChange={handleFormChange} />
              
              <label>Caminho da Imagem (Ex: /images/camisa-nova.png)</label>
              <input type="text" name="image" value={formData.image} onChange={handleFormChange} required placeholder="/images/..." />
            </div>

            <div className="form-column">
              <label>Descrição Curta</label>
              <textarea name="descricao_curta" value={formData.descricao_curta} onChange={handleFormChange} rows="5" placeholder="Descrição rápida para o card..."></textarea>

              <label>Descrição Completa (Longa)</label>
              <textarea name="descricao_longa" value={formData.descricao_longa} onChange={handleFormChange} rows="10" placeholder="Descrição completa para a página do produto..."></textarea>

              <label>Material (Ex: 100% Algodão)</label>
              <input type="text" name="material" value={formData.material} onChange={handleFormChange} placeholder="100% Algodão Premium" />

              <button type="submit" className="admin-save-button">
                Adicionar Produto
              </button>
            </div>

          </form>
      </div>
    </div>
  );
}

export default AdminAddPage;