// client/src/components/admin/pages/EmExecucao.js

import React, { useState, useEffect } from 'react';
import './EmExecucao.css'; // [NOVO] Importaremos o CSS específico para esta página

// [PARA O FUTURO] Imports do Firebase
// import { db } from '../../../firebase';
// import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// --- DADOS SIMULADOS (remover quando usar o Firebase) ---
const dadosSimulados = [
  {
    id: 'xyz123',
    cliente: 'Mariana Costa',
    veiculo: 'Toyota Corolla',
    placa: 'ABC1D23',
    mecanico: 'Carlos Alberto',
    servicos: ['Troca de óleo e filtro', 'Revisão dos freios'],
    inicio: new Date(2025, 5, 19, 9, 15), // Ano, Mês (0-11), Dia, Hora, Minuto
    status: 'Em Execução'
  },
  {
    id: 'abc789',
    cliente: 'Fernando Lima',
    veiculo: 'Honda Civic',
    placa: 'XYZ4E56',
    mecanico: 'Ana Júlia',
    servicos: ['Alinhamento e Balanceamento', 'Troca de pneu'],
    inicio: new Date(2025, 5, 19, 10, 30),
    status: 'Em Execução'
  },
  {
    id: 'def456',
    cliente: 'Ricardo Souza',
    veiculo: 'Ford Ka',
    placa: 'QWE7F89',
    mecanico: 'Carlos Alberto',
    servicos: ['Diagnóstico do motor'],
    inicio: new Date(2025, 5, 19, 11, 0),
    status: 'Em Execução'
  }
];
// --- FIM DOS DADOS SIMULADOS ---


function EmExecucao() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicos = async () => {
      setLoading(true);

      // =================================================================
      // PARTE 1: SIMULAÇÃO DE DADOS (USAR DURANTE O DESENVOLVIMENTO)
      // =================================================================
      setTimeout(() => {
        setServicos(dadosSimulados);
        setLoading(false);
      }, 1000); // Simula 1 segundo de carregamento


      // =================================================================
      // PARTE 2: CÓDIGO REAL DO FIREBASE (DESCOMENTAR PARA USAR)
      // =================================================================
      /*
      try {
        // Assume que sua coleção se chama 'atendimentos' ou similar
        const atendimentosRef = collection(db, 'atendimentos');
        
        // Cria a consulta: busca documentos onde status é 'Em Execução' e ordena pelo início
        const q = query(
          atendimentosRef, 
          where('status', '==', 'Em Execução'),
          orderBy('inicio', 'asc') // Mostra os mais antigos primeiro
        );

        const querySnapshot = await getDocs(q);
        const listaServicos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Converte o Timestamp do Firebase para um objeto Date do JS
          inicio: doc.data().inicio.toDate() 
        }));
        
        setServicos(listaServicos);

      } catch (error) {
        console.error("Erro ao buscar serviços em execução:", error);
        // Tratar o erro, talvez mostrando uma mensagem na tela
      } finally {
        setLoading(false);
      }
      */
    };

    fetchServicos();
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
            <div key={servico.id} className="servico-card">
              <div className="card-header">
                <h3>{servico.veiculo}</h3>
                <span className="placa">{servico.placa}</span>
              </div>
              <div className="card-body">
                <p><strong>Cliente:</strong> {servico.cliente}</p>
                <p><strong>Mecânico:</strong> {servico.mecanico}</p>
                <p><strong>Início:</strong> {servico.inicio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
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
                <button className="btn-details">Ver Detalhes</button>
                <button className="btn-concluir">Concluir Serviço</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmExecucao;