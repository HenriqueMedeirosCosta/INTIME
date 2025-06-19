// client/src/components/admin/FilaAtendimento.js (CONECTADO COM DADOS SIMULADOS)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FilaAtendimento.css'; // Usaremos um CSS para os cards

// Para o futuro, quando conectarmos ao Firebase
// import { db } from '../../../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

function FilaAtendimento() {
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarFila = async () => {
      setLoading(true);

      // =================================================================
      // --- CÓDIGO DE SIMULAÇÃO  ---
      // =================================================================
      const dadosDaFila = [
        { id: '1', senha: '101', carro: 'VW Fox', servico: 'Troca de Óleo' },
        { id: '2', senha: '102', carro: 'Honda Civic', servico: 'Alinhamento e Balanceamento' },
        { id: '3', senha: '103', carro: 'Fiat Uno', servico: 'Revisão Completa' },
      ];

      setTimeout(() => {
        setFila(dadosDaFila);
        setLoading(false);
      }, 500);

      // =================================================================
      // --- CÓDIGO REAL DO FIREBASE (PARA O FUTURO) ---
      // =================================================================
      /*
      try {
        const atendimentosRef = collection(db, 'clientes');
        const q = query(atendimentosRef, where('status', '==', 'Aguardando atendimento'));
        const querySnapshot = await getDocs(q);
        const atendimentosDaFila = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFila(atendimentosDaFila);
      } catch (error) {
        console.error("Erro ao buscar fila do Firebase:", error);
      } finally {
        setLoading(false);
      }
      */
    };

    carregarFila();
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
                <Link to={`/admin/dashboard/fila/editar/${atendimento.id}`} className="btn-atender">
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
