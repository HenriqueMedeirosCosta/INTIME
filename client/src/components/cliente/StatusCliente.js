import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../ui/ConfirmModal';
import './StatusCliente.css';
import logo from '../images/rodape.png';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

function StatusCliente() {
  const { senha } = useParams();
  
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  // Buscar cliente pelo número da senha
  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/clientes/${senha}`);
        setUsuario(res.data);
      } catch (err) {
        setUsuario(null);
        setMensagem('Usuário não encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (senha) {
      buscarCliente();
    }
  }, [senha]);

  if (loading) return <p>Carregando...</p>;
  if (!usuario) return <p>{mensagem || 'Dados não encontrados.'}</p>;

  // Enviar mensagem via WhatsApp
  const handleWhatsapp = () => {
    const msg = `Olá, gostaria de informações sobre o serviço do veículo ${usuario.carro}`;
    window.open(`https://wa.me/${usuario.telefone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Cancelar atendimento via API
  const handleCancelarAtendimento = async () => {
    try {
      await axios.put(`http://localhost:3000/clientes/${usuario.senha}`, {
        status: 'Cancelado',
      });
      alert('Atendimento cancelado!');
      setMostrarModal(false);
      navigate('/');
    } catch (error) {
      console.error('Erro ao cancelar atendimento:', error);
      alert('Erro ao cancelar. Tente novamente.');
      setMostrarModal(false);
    }
  };

  return (
    <div className="painel-container">
      <img src={logo} alt="Somocar" className="painel-logo" />

      <div className="info-box">
        <p><strong>Veículo:</strong> {usuario.carro}</p>
        <p><strong>Serviço:</strong> {usuario.servico}</p>
        <p><strong>Status:</strong> {usuario.status}</p>
      </div>

      <div className="senha-box">
        <span>SENHA: {usuario.senha}</span>
      </div>

      <button className="btn-cancelar" onClick={() => setMostrarModal(true)}>
        Cancelar atendimento
      </button>

      <button className="btn-whatsapp" onClick={handleWhatsapp}>
        <FaWhatsapp size={20} style={{ marginRight: 8 }} />
        Ir para WhatsApp
      </button>

      {mostrarModal && (
        <ConfirmModal
          mensagem="Deseja realmente cancelar o atendimento?"
          onConfirmar={handleCancelarAtendimento}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default StatusCliente;
