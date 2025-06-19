// src/components/cliente/Formulario.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';
import { FaUser, FaCar, FaWrench, FaPhone, FaIdCard } from 'react-icons/fa';
import axios from 'axios';
import Telinha from '../ui/telinha';

const Formulario = () => {
  const [mostrar, setMostrar] = useState(false);
  const [senha, setSenha] = useState('');
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

    // Formatando os dados
    const nome = cliente.nome.trim();
    const telefone = cliente.telefone.replace(/\D/g, '');
    const carro = cliente.carro.trim();
    const placa = cliente.placa.trim().toUpperCase();
    const servico = cliente.servico.trim();

    const dadosFormatados = { nome, telefone, carro, placa, servico };

    try {
      console.log('[DEBUG] Dados sendo enviados:', dadosFormatados);
      const response = await axios.post('http://localhost:3000/clientes', dadosFormatados);

      setSenha(response.data.senha);
      setMostrar(true);
    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Resposta da API:', error.response?.data);
      console.error('Erro ao cadastrar cliente:', error);
      alert(error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
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

      {mostrar && (
        <Telinha
          titulo="Cadastro realizado com sucesso!"
          mensagem={`Sua senha é: ${senha}`}
          aoConfirmar={() => navigate(`/status/${senha}`)}
        />
      )}

      <div className="footer">
        <img
          src={require('../images/rodape.png')}
          alt="Logo Somocar"
          className="footer-logo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    </div>
  );
}

export default Formulario;
