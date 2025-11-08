import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// 1. IMPORTE O 'clearCart'
import { useCart } from '../../context/CartContext.jsx';
import './index.css';
import { FaCreditCard } from 'react-icons/fa';
import { RiPixFill } from 'react-icons/ri'; 

function CheckoutPage() {
  const navigate = useNavigate();
  // 2. PEGUE O 'clearCart' DO CONTEXTO
  const { cartItems, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const frete = 0.00; 
  const total = subtotal + frete;

  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('pix'); 

  const API_URL = 'https://api-1-6p1t.onrender.com';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserCards(parsedUser.id);
    } else {
      navigate('/minha-conta');
    }
  }, [navigate]);

  const fetchUserCards = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/cards?userId=${userId}`);
      const data = await response.json();
      setCards(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Erro ao carregar seus cartões.');
    } finally {
      setLoading(false);
    }
  };

  // Lógica (simulada) para finalizar o pedido
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // (Aqui você faria a chamada final para sua API de pagamento)
    
    toast.success('Pedido finalizado com sucesso!');
    
    // Redireciona para a Home após 2s
    setTimeout(() => {
      // 3. CHAME O 'clearCart' AQUI
      clearCart(); // Esvazia o carrinho
      navigate('/'); // Redireciona para a Home
    }, 2000);
  };

  if (loading || !user) {
    return <div className="checkout-container">Carregando...</div>;
  }
  
  return (
    <div className="checkout-container">
      <h1 className="main-title">Finalizar Pedido</h1>
      
      <form className="checkout-layout" onSubmit={handleCheckout}>
        
        {/* Coluna Esquerda: Pagamento */}
        <div className="payment-details">
          <h2>Informações Pessoais</h2>
          <div className="user-info-box">
            <p><strong>Nome:</strong> {user.nomeCompleto}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Endereço:</strong> {user.rua}, {user.numero} - {user.bairro}</p>
          </div>

          <h2>Forma de Pagamento</h2>
          <div className="payment-options-list">
            
            {/* Opção PIX */}
            <label 
              htmlFor="pix" 
              className={`payment-option ${paymentMethod === 'pix' ? 'selected' : ''}`}
            >
              <input 
                type="radio" 
                id="pix" 
                name="paymentMethod" 
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <RiPixFill className="payment-icon" />
              <div className="payment-details-text">
                <strong>Pix</strong>
                <span>(Aprovação imediata)</span>
              </div>
            </label>

            {/* Opção Cartões Salvos (Loop) */}
            {cards.map(card => (
              <label 
                key={card.id} 
                htmlFor={card.id}
                
                // 1. MUDE AQUI (de === para ==)
                className={`payment-option ${paymentMethod == card.id ? 'selected' : ''}`}
              >
                <input 
                  type="radio" 
                  id={card.id} 
                  name="paymentMethod" 
                  value={card.id} // O value={card.id} está correto
                  
                  // 2. MUDE AQUI (de === para ==)
                  checked={paymentMethod == card.id}
                  
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaCreditCard className="payment-icon" />
                <div className="payment-details-text">
                  <strong>Final {card.numero.slice(-4)}</strong>
                  <span>{card.nome.toUpperCase()} - {card.validade}</span>
                </div>
              </label>
            ))}
            
            <Link to="/perfil" className="add-card-link">
              + Adicionar novo cartão
            </Link>

          </div>
        </div>
        
        {/* Coluna Direita: Resumo do Pedido */}
        <aside className="order-summary">
          <h3>Resumo do Pedido</h3>
          
          <div className="summary-items-list">
            {cartItems.map(item => (
              <div className="summary-item" key={item.id}>
                <span>{item.quantity}x {item.name}</span>
                <span>R$ {item.price}</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="summary-row">
            <span>Frete:</span>
            <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button type="submit" className="checkout-button">
            Finalizar Compra
          </button>
        </aside>

      </form>
    </div>
  );
}

export default CheckoutPage;