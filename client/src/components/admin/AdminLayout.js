import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';
import logoSomocar from '../images/rodape.png';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Protege a rota checando token no localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // redireciona para login se não tiver token
    }
  }, [navigate]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-header">
          <img src={logoSomocar} alt="Logo Somocar" className="sidebar-logo" />
        </div>
        
        <nav className="sidebar-nav">
          <ul className="menu-list">
            <li className="menu-title">Menu</li>
            <li><NavLink to="/admin/dashboard" end onClick={closeSidebar}>Início</NavLink></li>
            <li><NavLink to="/admin/dashboard/fila" onClick={closeSidebar}>Fila de Atendimento</NavLink></li>
            <li><NavLink to="/admin/dashboard/atendimento" onClick={closeSidebar}>Em Execução</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="main-content-wrapper">
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
