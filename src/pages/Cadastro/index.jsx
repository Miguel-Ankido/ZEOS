import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css'; 

function CadastroPage() {
  // --- Estados do Formulário ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  
  // 1. NOVOS ESTADOS PARA O ENDEREÇO
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  // O estado 'endereco' foi removido

  const navigate = useNavigate();
  const API_URL = 'https://api-1-6p1t.onrender.com'; // Sua URL do Render

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
      const existingUser = await checkResponse.json();

      if (existingUser.length > 0) {
        toast.warn('Este e-mail já está cadastrado. Tente fazer login.');
        return; 
      }

      // 2. CORPO DO FETCH ATUALIZADO com os campos separados
      const createResponse = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          nomeCompleto: nomeCompleto,
          telefone: telefone,     
          rua: rua,
          numero: numero,
          bairro: bairro,
          cep: cep,
          cidade: cidade
        }),
      });

      if (createResponse.ok) {
        toast.success('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/login'); 
        }, 1000); 

      } else {
        throw new Error('Falha ao criar usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      toast.error('Ocorreu um erro ao tentar cadastrar.');
    }
  };
  // --- Fim da Lógica ---

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1 className="main-title">Cadastrar-se</h1>
        
        <form onSubmit={handleRegister}>
          
          <label htmlFor="reg-nome">Nome Completo *</label>
          <input 
            type="text" 
            id="reg-nome"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required 
            placeholder='Insira seu nome completo..'
          />

          <label htmlFor="reg-email">Endereço de e-mail *</label>
          <input 
            type="email" 
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder='Insira o E-mail..'
          />

          <label htmlFor="reg-telefone">Telefone *</label>
          <input 
            type="text" 
            id="reg-telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required 
            placeholder='(XX) 9XXXX-XXXX'
          />

          {/* --- 3. NOVOS INPUTS DE ENDEREÇO --- */}

          <label htmlFor="reg-rua">Rua *</label>
          <input 
            type="text" 
            id="reg-rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            required 
            placeholder='Ex: Rua das Flores'
          />
          
          <label htmlFor="reg-numero">Número *</label>
          <input 
            type="text" 
            id="reg-numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required 
            placeholder='Ex: 123'
          />

          <label htmlFor="reg-bairro">Bairro *</label>
          <input 
            type="text" 
            id="reg-bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required 
            placeholder='Ex: Centro'
          />

          <label htmlFor="reg-cep">CEP *</label>
          <input 
            type="text" 
            id="reg-cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required 
            placeholder='Ex: 12345-678'
          />

          <label htmlFor="reg-cidade">Cidade *</label>
          <input 
            type="text" 
            id="reg-cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required 
            placeholder='Ex: São Paulo'
          />
          
          {/* --- Fim dos Inputs de Endereço --- */}
          
          <label htmlFor="reg-password">Senha *</label>
          <input 
            type="password" 
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder='Insira a Senha..'
          />
          
          <p className="register-info">
            Seus dados pessoais serão usados para aprimorar a sua experiência.
          </p>


          <button type="submit" className="form-button">Cadastrar-se</button>
          
          <Link to="/login" className="back-to-login">
            Já tem uma conta? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CadastroPage;