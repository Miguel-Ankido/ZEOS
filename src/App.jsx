import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Importa seus componentes e páginas
import Header from './componentes/cabecalho/Header.jsx';
import Home from './pages/Home/index.jsx'; // Sua página principal
import Erro from './pages/Erro/index.jsx'; // Sua página de erro 404
// import './App.css'; // (Descomente se você tiver um App.css)

/**
 * Este é o "Molde" (Layout) da sua aplicação.
 * Ele renderiza o Header e, embaixo dele, o <Outlet />.
 * O <Outlet /> é o local onde o React Router vai "encaixar"
 * a página da rota atual (seja a Home ou a Erro).
 */
const AppLayout = () => {
  return (
    <div className="app-container">
      {/* O Header sempre aparece */}
      <Header />
      
      {/* O <Outlet /> renderiza a página da rota correspondente */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// O componente App agora SÓ cuida das rotas
function App() {
  return (
    <Routes>
      {/* Todas as rotas aqui dentro usarão o "molde" AppLayout */}
      <Route element={<AppLayout />}>

        {/* Rota 1: Quando a URL for "/", renderize a página <Home /> */}
        <Route path="/" element={<Home />} />

        {/* Rota 2: Para QUALQUER outra URL ("*"), renderize a página <Erro /> */}
        <Route path="*" element={<Erro />} />

      </Route>
    </Routes>
  );
}

export default App;