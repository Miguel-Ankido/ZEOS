import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css';
import { FaUserCircle, FaCreditCard, FaRegCreditCard } from 'react-icons/fa';

function PerfilPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // 1. Estados para o formulário de cartão
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  // 2. Estado para os cartões salvos (vem da API)
  const [savedCards, setSavedCards] = useState([]);

  // !! IMPORTANTE !! Troque pela sua URL da API
  const API_URL = 'https://api-1-6p1t.onrender.com';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // 3. Assim que pegar o usuário, busca os cartões DELE
      fetchUserCards(parsedUser.id);
    } else {
      navigate('/minha-conta');
    }
  }, [navigate]);

  // 4. Função que busca os cartões do usuário na API
  const fetchUserCards = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/cards?userId=${userId}`);
      const data = await response.json();
      setSavedCards(data);
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      toast.error('Não foi possível carregar seus cartões.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Você saiu da sua conta.');
    navigate('/');
  };

  // 5. Função para SALVAR o novo cartão na API
  const handleSaveCard = async (e) => {
    e.preventDefault();
    if (!user) return; // Segurança

    const newCard = {
      // O json-server cria o 'id'
      userId: user.id, // Liga o cartão ao usuário
      numero: cardNumber,
      nome: cardName,
      validade: cardExpiry
    };

    try {
      const response = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        toast.success('Cartão salvo com sucesso!');
        fetchUserCards(user.id); // Re-busca a lista de cartões (para incluir o novo)
        setShowCardForm(false); // Esconde o formulário
        // Limpa os campos
        setCardNumber('');
        setCardName('');
        setCardExpiry('');
      } else {
        throw new Error('Falha ao salvar o cartão');
      }
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      toast.error('Erro ao salvar o cartão.');
    }
  };

  const getFullAddress = () => {
    if (!user) return '';
    return `${user.rua}, ${user.numero}, ${user.bairro} - ${user.cidade}`;
  };

  // 6. Função para formatar o número do cartão (como no mockup)
  const maskCardNumber = (number) => {
    if (!number) return '';
    return '**** **** **** ' + number.slice(-4);
  };

  if (!user) {
    return <div className="profile-container">Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-layout">
        
        <aside className="profile-sidebar">
          <FaUserCircle className="avatar-icon" />
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </aside>

        <main className="profile-content">
          <form className="info-form">
            <label htmlFor="nome">Nome Completo *</label>
            <input 
              type="text" 
              id="nome" 
              value={user.nomeCompleto} 
              readOnly 
            />
            <label htmlFor="endereco">Endereço *</label>
            <input 
              type="text" 
              id="endereco" 
              value={getFullAddress()} 
              readOnly 
            />
          </form>

          <h2 className="payment-title">Formas de Pagamento</h2>
          
          <div className="payment-options">
            {/* 7. O botão agora mostra/esconde o formulário */}
            <button className="payment-add-button" onClick={() => setShowCardForm(true)}>
              <FaCreditCard />
              <span>Adicionar Cartão de Crédito</span>
            </button>
            {/* (O de débito faria o mesmo) */}
          </div>

          {/* 8. O NOVO FORMULÁRIO DE CARTÃO (Condicional) */}
          {showCardForm && (
            <form className="card-form" onSubmit={handleSaveCard}>
              <h3>Novo Cartão de Crédito</h3>
              <label htmlFor="card-num">Número do Cartão</label>
              <input 
                type="text" 
                id="card-num" 
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <label htmlFor="card-name">Nome no Cartão</label>
              <input 
                type="text" 
                id="card-name" 
                placeholder="JOÃO S."
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
              <label htmlFor="card-expiry">Validade (MM/AA)</label>
              <input 
                type="text" 
                id="card-expiry" 
                placeholder="02/30"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
              <div className="card-form-actions">
                <button type="submit" className="form-button-save">Salvar</button>
                <button type="button" className="form-button-cancel" onClick={() => setShowCardForm(false)}>Cancelar</button>
              </div>
            </form>
          )}

          {/* 9. Lista de cartões salvos (agora vindo da API) */}
          <div className="saved-cards-list">
            {savedCards.length === 0 ? (
              <p className="no-cards-message">Nenhum cartão salvo.</p>
            ) : (
              savedCards.map(card => (
                <div className="saved-card-item" key={card.id}>
                  <FaCreditCard className="card-icon" />
                  <div className="card-details">
                    <span className="card-number">Cartão Com Final {maskCardNumber(card.numero)}</span>
                    <span className="card-info">{card.nome.toUpperCase()}</span>
                  </div>
                  <span className="card-expiry">{card.validade}</span>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerfilPage;