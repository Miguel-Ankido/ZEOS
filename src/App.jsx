import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
// 1. Importe o ToastContainer e o CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === NÚCLEO ===
import Header from './componentes/cabecalho/Header.jsx';
import BuscaPage from './pages/Busca/index.jsx'
import Home from './pages/Home/index.jsx';
import Erro from './pages/Erro/index.jsx';
import EsqueciSenhaPage from './pages/EsqueciSenha/index.jsx';

// === PÁGINAS DO MENU ===
import Loja from './pages/Loja/index.jsx';
import Sobre from './pages/Sobre/index.jsx';
import Ajuda from './pages/Ajuda/index.jsx';
import ProdutoPage from './pages/Produto/index.jsx';
import CarrinhoPage from './pages/Carrinho/index.jsx';


// === AUTENTICAÇÃO ===
import LoginPage from './pages/Login/index.jsx'; 
import CadastroPage from './pages/Cadastro/index.jsx';

// === ROTAS PROTEGIDAS ===
// (1. Corrigido o typo 'jsx00')
import Perfil from './pages/Perfil/index.jsx'; 
// (2. Corrigido o import de 'Chekout' para 'CheckoutPage')
import CheckoutPage from './pages/Checkout/index.jsx'; 
import Protecao from './componentes/Protecao/index.jsx';
import AdminRoute from './componentes/AdminRoute.jsx';
import AdminEditPage from './pages/AdminEdit/index.jsx';
import AdminAddPage from './pages/AdminAdd/index.jsx';


const AppLayout = () => {
  // O seu AppLayout estava perfeito, copiei ele
  return (
    <div className="app-container">
      <ToastContainer
        position="top-center"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// --- ESTA É A SEÇÃO CORRIGIDA E COMPLETA ---
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        
        {/* === ROTAS PÚBLICAS === */}
        <Route path="/" element={<Home />} />
        
        {/* Rotas do Menu (usando seus imports) */}
        <Route path="/loja" element={<Loja />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/busca" element={<BuscaPage />} />
        
        <Route path="/produto/:id" element={<ProdutoPage />} />
        <Route path="/carrinho" element={<CarrinhoPage />} />

        {/* Rotas de Autenticação (do seu código) */}
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/cadastro" element={<CadastroPage />} /> 
        <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} /> 

        

        {/* === ROTA PROTEGIDA === */}
        <Route 
          path="/perfil" 
          element={
            <Protecao>
              <Perfil />
            </Protecao>
          } 
        />
        <Route 
          path="/admin/editar-produto" 
          element={
            <AdminRoute>
              <AdminEditPage />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/adicionar-produto" 
          element={
            <AdminRoute>
              <AdminAddPage />
            </AdminRoute>
          } 
        />

        {/* (3. O <CheckoutPage /> agora está definido) */}
        <Route 
          path="/checkout" 
          element={
            <Protecao>
              <CheckoutPage />
            </Protecao>
          } 
        />

        {/* === ROTA DE ERRO === */}
        <Route path="*" element={<Erro />} />
      </Route>
    </Routes>
  );
}
export default App;