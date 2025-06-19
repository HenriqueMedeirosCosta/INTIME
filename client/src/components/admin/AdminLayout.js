// client/src/components/admin/AdminLayout.js (VERSÃO RESPONSIVA)

import React, { useState } from 'react'; // [NOVO] Importamos o useState
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';
import logoSomocar from '../images/rodape.png'; 

// [NOVO] Componente para o ícone do menu (hambúrguer)
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


function AdminLayout() {
  // [NOVO] Estado para controlar a visibilidade da sidebar em modo mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // [NOVO] Função para fechar a sidebar (útil para o overlay e links)
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      
      {/* [NOVO] Overlay que aparece atrás da sidebar quando ela está aberta em mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* A classe 'open' será adicionada condicionalmente */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-header">
          <img src={logoSomocar} alt="Logo Somocar" className="sidebar-logo" />
        </div>
        
        {/* Adicionamos o onClick nos links para fechar o menu ao navegar */}
        <nav className="sidebar-nav">
          <ul className="menu-list">
            <li className="menu-title">Menu</li>
            <li><NavLink to="/admin/dashboard" end onClick={closeSidebar}>Início</NavLink></li>
            <li><NavLink to="/admin/dashboard/fila" onClick={closeSidebar}>Fila de Atendimento</NavLink></li>
            <li><NavLink to="/admin/dashboard/em-execucao" onClick={closeSidebar}>Em Execução</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="main-content-wrapper"> {/* [NOVO] Wrapper para o conteúdo principal */}
        {/* [NOVO] Header que só aparece em mobile e contém o botão do menu */}
        <header className="mobile-header">
          <button onClick={() => setSidebarOpen(true)} className="menu-toggle-btn">
            <MenuIcon />
          </button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;