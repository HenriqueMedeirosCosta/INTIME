// client/src/App.js (VERSÃO FINAL CORRIGIDA)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Componentes do Cliente ---
import Home from './components/cliente/Home';
import Formulario from './components/cliente/Formulario';
import StatusCliente from './components/cliente/StatusCliente';

// --- Componentes do Admin ---
import AdminHome from './components/admin/AdminHome';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import EditarCliente from './components/admin/EditarCliente';

// Importando os componentes das suas respectivas pastas
import DashboardWelcome from './components/admin/pages/DashboardWelcome';
import EmExecucao from './components/admin/pages/EmExecucao'; 
import FilaAtendimento from './components/admin/FilaAtendimento';

function App() {
  return (
    <Router>
      <Routes>
        {/* === ROTAS DO CLIENTE === */}
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Formulario />} />
        <Route path="/status/:senha" element={<StatusCliente />} />


        {/* === FLUXO DE ACESSO DO GERENTE === */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        

        {/* === DASHBOARD DO GERENTE === */}
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardWelcome />} />
          <Route path="fila" element={<FilaAtendimento />} />
          <Route path="em-execucao" element={<EmExecucao />} />
          <Route path="fila/editar/:id" element={<EditarCliente />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;