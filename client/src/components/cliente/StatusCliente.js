import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StatusCliente.css';
import logo from '../images/rodape.png';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

function StatusCliente() {
  const { senha } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarCliente = async () => {
      console.log('[Front-End] Buscando dados para senha:', senha);
      try {
        const res = await axios.get(`http://localhost:3000/clientes/${senha}`);
        const data = res.data;
        console.log('[Front-End] Dados recebidos do servidor:', data);
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

  const handleWhatsapp = () => {
    const msg = `Olá, gostaria de informações sobre o serviço do veículo ${usuario.carro}`;
    window.open(`https://wa.me/${usuario.telefone}?text=${encodeURIComponent(msg)}`, '_blank');
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
      <button className="btn-cancelar">Cancelar atendimento</button>
      <button className="btn-whatsapp" onClick={handleWhatsapp}>
        <FaWhatsapp size={20} style={{ marginRight: 8 }} />
        Ir para whatsapp
      </button>
    </div>
  );
}

export default StatusCliente;
