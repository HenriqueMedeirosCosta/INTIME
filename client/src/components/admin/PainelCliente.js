// src/components/admin/DetalheCliente.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { buscarClientePorId, atualizarCliente } from '../../services/api';
import Swal from 'sweetalert2';

function DetalheCliente() {
  const { senha } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        setLoading(true);
        setError(null);
        const data = await buscarClientePorId(senha);
        setCliente(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar detalhes do cliente.');
        setCliente(null);
      } finally {
        setLoading(false);
      }
    }

    if (senha) {
      carregarDetalhes();
    }
  }, [senha]);

  const finalizarAtendimento = async () => {
    try {
      const agora = new Date();
      const fimAtendimento = agora.toLocaleString('pt-BR', {
        hour12: false,
        timeZone: 'America/Sao_Paulo'
      });

      const dadosAtualizados = {
        ...cliente,
        status: 'Finalizado',
        fimAtendimento: fimAtendimento
      };

      await atualizarCliente(senha, dadosAtualizados);

      Swal.fire({
        icon: 'success',
        title: 'Serviço finalizado!',
        text: ' Atendimento encerrado com sucesso!',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate('/admin/dashboard/atendimento'), 2000);

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: ' Falha ao finalizar o atendimento.',
      });
    }
  };

  if (loading) return <div className="container mt-4"><p>Carregando...</p></div>;
  if (error) return <div className="container mt-4 alert alert-danger">Erro: {error}</div>;
  if (!cliente) return <div className="container mt-4 alert alert-warning">Cliente não encontrado.</div>;

  return (
    <div className="container mt-4">
      <h3>Detalhes de {cliente.nome}</h3>
      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>ID:</strong> {cliente.id}</li>
        <li className="list-group-item"><strong>Telefone:</strong> {cliente.telefone}</li>
        <li className="list-group-item"><strong>Carro:</strong> {cliente.carro}</li>
        <li className="list-group-item"><strong>Placa:</strong> {cliente.placa}</li>
        <li className="list-group-item"><strong>Serviço:</strong> {cliente.servico}</li>
        <li className="list-group-item"><strong>Status:</strong> {cliente.status}</li>
        {cliente.inicioAtendimento && (
          <li className="list-group-item">
            <strong>Início Atendimento:</strong> {new Date(cliente.inicioAtendimento).toLocaleString('pt-BR')}
          </li>
        )}
        {cliente.fimAtendimento && (
          <li className="list-group-item">
            <strong>Fim Atendimento:</strong> {cliente.fimAtendimento}
          </li>
        )}
      </ul>

      <div className="mt-3">
        <button onClick={finalizarAtendimento} className="btn btn-success me-2">
          Finalizar Serviço
        </button>
        
        <Link to="/admin/dashboard/atendimento" className="btn btn-secondary">
          ← Voltar
        </Link>
      </div>
    </div>
  );
}

export default DetalheCliente;
