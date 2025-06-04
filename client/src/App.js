// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaPessoas from './components/admin/ListaClientes';
import Formulario from './components/cliente/Formulario';
import DetalhePessoa from './components/cliente/PainelCliente';
import EditarPessoa from './components/admin/EditarCliente';

// Assumindo que os arquivos dos componentes estão em src/components/
// e exportam default ou o nome correspondente.


function App() {
  return (
    <Router>
      {/* Você pode adicionar um Navbar ou Layout aqui, se desejar, fora do <Routes> */}
      <div className="app-container"> {/* Exemplo de um container geral */}
        <Routes>
          <Route path="/" element={<ListaPessoas />} />
          <Route path="/cadastro" element={<Formulario />} />
          <Route path="/pessoa/:id" element={<DetalhePessoa />} />
          <Route path="/editar/:id" element={<EditarPessoa />} />
          {/* Adicione outras rotas aqui, como uma página 404 */}
          {/* <Route path="*" element={<PaginaNaoEncontrada />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;