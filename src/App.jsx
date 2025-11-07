import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './componentes/cabecalho/Header.jsx';
import Home from './pages/Home/index.jsx';
import Erro from './pages/Erro/index.jsx';
import LoginPage from './pages/Login/index.jsx'; 
import CadastroPage from './pages/Cadastro/index.jsx'; // 1. Importe a nova página

const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/minha-conta" element={<LoginPage />} /> 
        
        {/* 2. Adicione a nova rota de cadastro */}
        <Route path="/cadastro" element={<CadastroPage />} /> 

        <Route path="*" element={<Erro />} />
      </Route>
    </Routes>
  );
}

export default App;