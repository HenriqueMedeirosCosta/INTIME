import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './StatusCliente.css'; // ou o nome correto do CSS
import logo from '../images/rodape.png';
import { FaWhatsapp } from 'react-icons/fa';

function StatusCliente() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const docRef = doc(db, 'clientes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDados(docSnap.data());
        } else {
          console.error('Documento não encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!dados) return <p>Dados não encontrados.</p>;

  const handleWhatsapp = () => {
    const msg = `Olá, gostaria de informações sobre o serviço do veículo ${dados.carro}`;
    window.open(`https://wa.me/${dados.telefone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="painel-container">
      <img src={logo} alt="Somocar" className="painel-logo" />
      <div className="info-box">
        <p><strong>Veículo:</strong> {dados.carro}</p>
        <p><strong>Serviço:</strong> {dados.servico}</p>
        <p><strong>Status:</strong> {dados.status}</p>
      </div>
      <div className="senha-box">
        <span>SENHA: {dados.senha}</span>
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
