import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FilaAtendimento.css';
import { listarClientes } from '../../services/api';

function FilaAtendimento() {
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarFila = async () => {
      setLoading(true);
      try {
        const response = await listarClientes();
        const clientesAguardando = response.data.filter(cliente => cliente.status === 'Aguardando');
        setFila(clientesAguardando);
        
      } catch (error) {
        console.error('Erro ao buscar fila da API:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarFila();

    const intervalo = setInterval(carregarFila, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(intervalo);
  }, []);

  if (loading) {
    return <p>Carregando fila de atendimento...</p>;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Fila de Atendimento</h2>
        <p>Clientes aguardando para iniciar o serviço.</p>
      </header>

      <div className="card-list">
        {fila.length > 0 ? (
          fila.map(atendimento => (
            <div key={atendimento.id} className="atendimento-card">
              <div className="card-header">
                <strong>Senha: {atendimento.senha}</strong>
              </div>
              <div className="card-body">
                <p><strong>Veículo:</strong> {atendimento.carro}</p>
                <p><strong>Serviço:</strong> {atendimento.servico}</p>
              </div>
              <div className="card-footer">
                <Link to={`/admin/dashboard/fila/editar/${atendimento.senha}`} className="btn-atender">
                  
                  Iniciar Atendimento
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum veículo na fila no momento.</p>
        )}
      </div>
    </div>
  );
}

export default FilaAtendimento;
