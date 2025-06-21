// client/src/components/admin/pages/EmExecucao.js

import React, { useState, useEffect } from 'react';
import './EmExecucao.css'; // Usaremos um CSS próprio para esta tela

import { db } from '../../../firebase';
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from 'firebase/firestore';

function EmExecucao() {
    const [emExecucao, setEmExecucao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEmExecucao = async () => {
        setLoading(true);
        setError('');
        try {
            const atendimentosRef = collection(db, 'clientes');
            // [MUDANÇA] A consulta agora busca por status 'Em Atendimento'
            const q = query(
                atendimentosRef,
                where('status', '==', 'Em Atendimento'),
                orderBy('timestamp', 'desc') // Mostra os mais recentes primeiro
            );
            const querySnapshot = await getDocs(q);
            const atendimentosEmExecucao = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmExecucao(atendimentosEmExecucao);
        } catch (err) {
            console.error("Erro ao buscar serviços em execução:", err);
            setError('Não foi possível carregar os serviços.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmExecucao();
    }, []);

    // Função para finalizar um atendimento
    const handleFinalizarAtendimento = async (atendimentoId) => {
        try {
            const atendimentoDocRef = doc(db, 'clientes', atendimentoId);
            // Atualiza o status para 'Concluido', usando o seu padrão
            await updateDoc(atendimentoDocRef, {
                status: 'concluido' 
            });
            // Remove o card da tela para feedback imediato
            setEmExecucao(prevAtendimentos => prevAtendimentos.filter(item => item.id !== atendimentoId));
            alert('Atendimento finalizado com sucesso!');
        } catch (err) {
            console.error("Erro ao finalizar atendimento:", err);
            alert("Não foi possível finalizar o atendimento.");
        }
    };

    if (loading) return <p>Carregando serviços em execução...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <header className="page-header">
                <h2>Serviços em Execução</h2>
                <p>Serviços que estão sendo realizados no momento.</p>
            </header>
            
            <div className="card-list">
                {emExecucao.length > 0 ? (
                    emExecucao.map(atendimento => (
                        <div key={atendimento.id} className="atendimento-card">
                            <div className="card-header">
                                <strong>Senha: {atendimento.senha || 'N/A'}</strong>
                            </div>
                            <div className="card-body">
                                <p><strong>Veículo:</strong> {atendimento.carro}</p>
                                <p><strong>Serviço:</strong> {atendimento.servico}</p>
                            </div>
                            <div className="card-footer">
                                {/* O botão agora finaliza o atendimento */}
                                <button onClick={() => handleFinalizarAtendimento(atendimento.id)} className="btn-finalizar">
                                    Finalizar Atendimento
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum serviço em execução no momento.</p>
                )}
            </div>
        </div>
    );
}

export default EmExecucao;