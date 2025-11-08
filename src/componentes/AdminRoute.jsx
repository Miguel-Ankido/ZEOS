import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Está logado?
  if (!user) {
    toast.error('Você precisa estar logado para acessar esta página.');
    return <Navigate to="/login" replace />;
  }

  // 2. É ADMIN?
  if (!user.isAdmin) {
    toast.error('Você não tem permissão para acessar esta página.');
    // Manda o usuário normal para a Home (ou Perfil)
    return <Navigate to="/" replace />;
  }

  // 3. Se passou nos dois, mostre a página admin
  return children;
}

export default AdminRoute;