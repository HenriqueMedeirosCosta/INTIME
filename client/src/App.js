// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Assumindo que os arquivos dos componentes estão em src/components/
// e exportam default ou o nome correspondente.
import Formulario from './components/formulario';
import ListaPessoas from './components/listaadmin';
import DetalhePessoa from './components/painelCliente';
import EditarPessoa from './components/editarPessoa';

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