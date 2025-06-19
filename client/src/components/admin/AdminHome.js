// client/src/components/admin/AdminHome.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; // O estilo que faz a animação
import logoInTime from '../images/logo.png'; 

function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Esta função cria o redirecionamento automático após 2 segundos
    const timer = setTimeout(() => {
      navigate('/admin/login');
    }, 2000);

    // Isso é uma boa prática para limpar o timer se o usuário sair da página
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="admin-home-container">
      <img
        src={logoInTime}
        alt="Logo In Time"
        className="admin-home-logo"
      />
    </div>
  );
}

export default AdminHome;