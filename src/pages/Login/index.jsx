import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importa o 'toast'
import './index.css'; 

function LoginPage() {
  // --- LÓGICA DA API ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  // !! IMPORTANTE !! Troque pela URL da sua API no Render
  const API_URL = 'https://api-1-6p1t.onrender.com'; 

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      // Busca na API pelo usuário E senha
      const response = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        // Se achou, salva no "token" (localStorage)
        localStorage.setItem('user', JSON.stringify(data[0]));
        
        // Dispara o toast de sucesso
        toast.success('Login bem-sucedido!'); 
        
        // Redireciona para a Home
        navigate('/'); 
      } else {
        // Dispara o toast de erro
        toast.error('E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Dispara o toast de erro de conexão
      toast.error('Ocorreu um erro ao tentar logar. Verifique sua API.');
    }
  };
  // --- FIM DA LÓGICA ---

  return (
    <div className="login-container">
      {/* Bloco de Login */}
      <div className="login-box">
        <h1 className="main-title">Entrar</h1>
        
        {/* Formulário conectado à função handleLogin */}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Nome de usuário ou e-mail *</label>
          <input 
            type="email" 
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="Insira o Usuário.."
          />
          
          <label htmlFor="password">Senha *</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Insira a Senha.."
          />
          
          <div className="form-actions">
            <button type="submit" className="form-button">Acessar</button>
          </div>
          <Link to="/esqueci-senha" className="forgot-password">
            Esqueceu sua senha?
          </Link>
        </form>
      </div>
      
      {/* Bloco de Cadastro */}
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