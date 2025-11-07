import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import './index.css'; 

function LoginPage() {
  // --- LÓGICA DA API ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Hook para redirecionar

  // 3. !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://sua-api.onrender.com'; 

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    try {
      // 4. Busca na API pelo usuário E senha
      const response = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );
      const data = await response.json();

      // 5. Se a API retornar um usuário (tamanho da lista > 0), o login é válido
      if (data.length > 0) {
        // 6. Salva o usuário no localStorage. Este é o nosso "token".
        localStorage.setItem('user', JSON.stringify(data[0]));
        alert('Login bem-sucedido!');
        
        // 7. Redireciona para a Home (ou /perfil se você preferir)
        navigate('/'); 
      } else {
        alert('E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao tentar logar. Verifique sua API.');
    }
  };
  // --- FIM DA LÓGICA ---

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="main-title">Entrar</h1>
        
        {/* 8. Conecta o formulário à função handleLogin */}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Nome de usuário ou e-mail *</label>
          <input 
            type="email" // Mudei para 'email' para validação
            id="username"
            value={email} // 9. Conecta o estado
            onChange={(e) => setEmail(e.target.value)} // 10. Atualiza o estado
            required 
          />
          
          <label htmlFor="password">Senha *</label>
          <input 
            type="password" 
            id="password" 
            value={password} // 9. Conecta o estado
            onChange={(e) => setPassword(e.target.value)} // 10. Atualiza o estado
            required 
          />
          
          <div className="form-actions">
            <button type="submit" className="form-button">Acessar</button>
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Lembrar de Mim</label>
            </div>
          </div>
          
          <Link to="/esqueci-senha" className="forgot-password">
            Esquecu sua senha?
          </Link>
        </form>
      </div>
      
      <div className="register-prompt-box">
        <h2>Ainda não tem conta?</h2>
        <p>Crie sua conta agora mesmo para ter uma experiência de compra completa e personalizada.</p>
        <Link to="/cadastro" className="form-button register-button">
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;