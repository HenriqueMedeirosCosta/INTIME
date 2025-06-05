// src/components/cliente/Formulario.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Formulario.css';
import { FaUser, FaCar, FaWrench, FaPhone, FaIdCard } from 'react-icons/fa';

function Formulario() {
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    carro: '',
    placa: '',
    servico: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. Criar uma consulta para verificar telefone ou placa já existentes
    const q = query(
      collection(db, 'clientes'),
      where('telefone', '==', cliente.telefone)
    );

    const q2 = query(
      collection(db, 'clientes'),
      where('placa', '==', cliente.placa)
    );

    const [telefoneSnap, placaSnap] = await Promise.all([
      getDocs(q),
      getDocs(q2)
    ]);

    if (!telefoneSnap.empty) {
      alert('Já existe um cliente com este telefone.');
      return;
    }

    if (!placaSnap.empty) {
      alert('Já existe um cliente com esta placa.');
      return;
    }

    // 2. Gerar senha automaticamente
    const senha = Math.floor(1000 + Math.random() * 9000); // ex: 4 dígitos

    // 3. Salvar no Firebase
    await addDoc(collection(db, 'clientes'), {
      ...cliente,
      status: 'Aguardando',
      senha,
    });

    alert('Cadastro realizado com sucesso!');
    navigate('/');
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    alert('Erro ao cadastrar. Tente novamente.');
  }
};

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Olá<br />cliente amigo!!</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group icon-input">
          <FaUser className="input-icon" />
          <input
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            required
          />
        </div>

        <div className="form-group icon-input">
          <FaPhone className="input-icon" />
          <input
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            required
          />
        </div>

        <div className="form-group icon-input">
          <FaCar className="input-icon" />
          <input
            name="carro"
            value={cliente.carro}
            onChange={handleChange}
            placeholder="Carro"
            required
          />
        </div>

        <div className="form-group icon-input">
          <FaIdCard className="input-icon" />
          <input
            name="placa"
            value={cliente.placa}
            onChange={handleChange}
            placeholder="Placa do veículo"
            required
          />
        </div>

        <div className="form-group icon-input">
          <FaWrench className="input-icon" />
          <input
            name="servico"
            value={cliente.servico}
            onChange={handleChange}
            placeholder="Serviço desejado"
            required
          />
        </div>

        <button type="submit" className="form-button">Concluir</button>
      </form>

      <div className="footer">
        <img
          src={require('../images/rodape.png')}
          alt="Logo Somocar"
          className="footer-logo"
        />
      </div>
    </div>
  );
}

export default Formulario;
