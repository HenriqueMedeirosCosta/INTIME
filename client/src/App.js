// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaPessoas from './components/admin/ListaClientes';
import Formulario from './components/cliente/Formulario';
import StatusCliente from './components/cliente/StatusCliente'; // <- novo nome
import EditarPessoa from './components/admin/EditarCliente';
import Home from './components/cliente/Home';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Formulario />} />
          <Route path="/status" element={<StatusCliente />} />          
          <Route path="/status/:id" element={<StatusCliente />} />      
          <Route path="/editar/:id" element={<EditarPessoa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
