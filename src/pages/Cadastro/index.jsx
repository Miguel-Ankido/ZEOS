import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import './index.css'; 

function CadastroPage() {
  // --- LÓGICA DA API ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Hook para redirecionar

  // 3. !! IMPORTANTE !! Use a MESMA URL do Render
  const API_URL = 'https://sua-api.onrender.com';

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 4. Primeiro, VERIFICA se o e-mail já existe
      const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
      const existingUser = await checkResponse.json();

      if (existingUser.length > 0) {
        alert('Este e-mail já está cadastrado. Tente fazer login.');
        return; // Para a execução
      }

      // 5. Se o e-mail não existe, CRIA o novo usuário
      const createResponse = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (createResponse.ok) {
        alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
        // 6. Redireciona para a página de login
        navigate('/minha-conta');
      } else {
        throw new Error('Falha ao criar usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Ocorreu um erro ao tentar cadastrar. Verifique sua API.');
    }
  };
  // --- FIM DA LÓGICA ---

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1 className="main-title">Cadastrar-se</h1>
        
        {/* 7. Conecta o formulário à função handleRegister */}
        <form onSubmit={handleRegister}>
          <label htmlFor="reg-email">Endereço de e-mail *</label>
          <input 
            type="email" 
            id="reg-email"
            value={email} // 8. Conecta o estado
            onChange={(e) => setEmail(e.target.value)} // 9. Atualiza o estado
            required 
          />
          
          <label htmlFor="reg-password">Senha *</label>
          <input 
            type="password" 
            id="reg-password"
            value={password} // 8. Conecta o estado
            onChange={(e) => setPassword(e.target.value)} // 9. Atualiza o estado
            required 
          />
          
          <p className="register-info">
            Seus dados pessoais serão usados para aprimorar a sua experiência...
          </p>

          <button type="submit" className="form-button">Cadastrar-se</button>
          
          <Link to="/minha-conta" className="back-to-login">
            Já tem uma conta? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CadastroPage;