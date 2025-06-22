import React, { useState, useEffect } from 'react';
import './EmExecucao.css';
import { Link } from 'react-router-dom';
import { listarClientes } from '../../../services/api'; // Supondo que a função já existe

function EmExecucao() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicos = async () => {
      setLoading(true);
      try {
        const response = await listarClientes();
        const clientes = response.data || [];

        const emAtendimento = clientes
        .filter(c => c.status === 'Em atendimento')
        .map(c => ({
          senha: c.senha, 
          cliente: c.nome,
          veiculo: c.carro,
          placa: c.placa,
          servicos: [c.servico],
          inicio: c.horaInicio,
          status: c.status
        }));
          

        setServicos(emAtendimento);
      } catch (error) {
        console.error("Erro ao buscar serviços em execução:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();

    const intervalo = setInterval(fetchServicos, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(intervalo);
  }, []);

  if (loading) {
    return <div className="loading-message">Carregando serviços...</div>;
  }

  return (
    <div className="em-execucao-page">
      <header className="page-header">
        <h1>Serviços em Execução</h1>
        <p>Acompanhe os veículos que estão atualmente na oficina.</p>
      </header>

      {servicos.length === 0 ? (
        <div className="no-services-message">
          Nenhum serviço em execução no momento.
        </div>
      ) : (
        <div className="servicos-grid">
          {servicos.map(servico => (
            <div key={servico.senha} className="servico-card">
              <div className="card-header">
                <h3>{servico.veiculo}</h3>
                <span className="placa">{servico.placa}</span>
              </div>
              <div className="card-body">
                <p><strong>Cliente:</strong> {servico.cliente}</p>

                <p><strong>Início:</strong> {servico.inicio}</p>
                <div className="servicos-list">
                  <strong>Serviços:</strong>
                  <ul>
                    {servico.servicos.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-actions">
                <Link to={`pessoa/${servico.senha}`} className="btn-details">Ver Detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmExecucao;
