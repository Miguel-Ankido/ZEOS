import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css'; // Vamos criar este CSS

function EsqueciSenhaPage() {
  const [email, setEmail] = useState('');

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com';

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      // 1. Verifica se o e-mail existe na API
      const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
      const existingUser = await checkResponse.json();

      if (existingUser.length > 0) {
        
        toast.success('Um link de redefinição foi enviado.');
        setEmail(''); 
      } else {
        // 3. Se não existe, mostre a mesma mensagem (para segurança)
        //    (Não é bom dizer ao usuário que um e-mail "não existe")
        toast.success('Um email de redefinição foi enviado.');
        setEmail(''); // Limpa o campo
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="esqueci-container">
      <div className="esqueci-box">
        <h1 className="main-title">Recuperar Senha</h1>
        
        <form onSubmit={handlePasswordReset}>
          <p className="reset-info">
            Perdeu sua senha? Por favor, digite seu nome de usuário ou e-mail. Você receberá um link para criar uma nova senha por e-mail.
          </p>

          <label htmlFor="reset-email">Nome de usuário ou e-mail *</label>
          <input 
            type="email" 
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder='Insira seu e-mail...'
          />
          
          <button type="submit" className="form-button">Redefinir senha</button>
          
          <Link to="/login" className="back-to-login">
            Lembrou a senha? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EsqueciSenhaPage;