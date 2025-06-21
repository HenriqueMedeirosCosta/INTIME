// client/src/components/cliente/Formulario.js (COM PROTEÇÃO CONTRA DUPLO CLIQUE)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';
import { FaUser, FaCar, FaWrench, FaPhone, FaIdCard } from 'react-icons/fa';
import axios from 'axios';
// (Assumindo que você tem um modal de sucesso/erro para exibir o resultado)

function Formulario() {
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    carro: '',
    placa: '',
    servico: ''
  });

  // [NOVO] Estado para controlar o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se já estiver enviando, não faz nada
    if (isSubmitting) return;

    // [MUDANÇA] Inicia o processo de envio e desabilita o botão
    setIsSubmitting(true);

    const dadosFormatados = {
      nome: cliente.nome.trim(),
      telefone: cliente.telefone.replace(/\D/g, ''),
      carro: cliente.carro.trim(),
      placa: cliente.placa.trim().toUpperCase(),
      servico: cliente.servico.trim()
    };

    try {
<<<<<<< HEAD
      console.log('[DEBUG] Dados sendo enviados:', dadosFormatados);
      const response = await axios.post('http://localhost:3000/clientes', dadosFormatados);
      
      const senhaGerada = response.data.senha;
      setSenha(senhaGerada);
      setMostrar(true);
=======
      const response = await axios.post('http://localhost:3001/clientes', dadosFormatados);
      
      // Exibe a mensagem de sucesso com a senha
      alert(`Cadastro realizado com sucesso! Sua senha é: ${response.data.senha}`);

      // Redireciona para a página de status
      navigate(`/status/${response.data.id}`);

>>>>>>> 8f5512c8651f339037cf21e912916047a84e97da
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert(error.response?.data?.erro || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      // [MUDANÇA] Ao final de tudo (sucesso ou erro), reabilita o botão
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Olá<br />cliente amigo!!</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {/* ... Seus inputs continuam os mesmos ... */}
        <div className="form-group icon-input">
          <FaUser className="input-icon" />
          <input name="nome" value={cliente.nome} onChange={handleChange} placeholder="Nome completo" required disabled={isSubmitting} />
        </div>
        <div className="form-group icon-input">
          <FaPhone className="input-icon" />
          <input name="telefone" value={cliente.telefone} onChange={handleChange} placeholder="Telefone" required disabled={isSubmitting} />
        </div>
        <div className="form-group icon-input">
          <FaCar className="input-icon" />
          <input name="carro" value={cliente.carro} onChange={handleChange} placeholder="Carro" required disabled={isSubmitting} />
        </div>
        <div className="form-group icon-input">
          <FaIdCard className="input-icon" />
          <input name="placa" value={cliente.placa} onChange={handleChange} placeholder="Placa do veículo" required disabled={isSubmitting} />
        </div>
        <div className="form-group icon-input">
          <FaWrench className="input-icon" />
          <input name="servico" value={cliente.servico} onChange={handleChange} placeholder="Serviço desejado" required disabled={isSubmitting} />
        </div>
        
        {/* [MUDANÇA] O botão agora é desabilitado e muda o texto durante o envio */}
        <button type="submit" className="form-button" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Concluir'}
        </button>
      </form>

<<<<<<< HEAD
      {mostrar && (
        <Telinha
          titulo="Cadastro realizado com sucesso!"
          mensagem={`Sua senha é: ${senha}`}
          aoConfirmar={() => {
            
            navigate(`/status/${senha}`);
          }
          }
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
=======
      {/* ... Seu rodapé com a logo ... */}
>>>>>>> 8f5512c8651f339037cf21e912916047a84e97da
    </div>
  );
}

export default Formulario;