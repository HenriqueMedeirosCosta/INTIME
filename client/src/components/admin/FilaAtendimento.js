// client/src/components/admin/FilaAtendimento.js (VERSÃO FINAL E CORRIGIDA)

import React, { useState, useEffect } from 'react';
// [CORREÇÃO 2] Removemos o 'Link', pois agora usamos um botão e o 'useNavigate'.
import { useNavigate } from 'react-router-dom';
import './FilaAtendimento.css';

// [CORREÇÃO 1] Este é o caminho correto para o seu arquivo firebase.js, dentro de 'src'.
import { db } from '../../firebase'; 
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from 'firebase/firestore';

function FilaAtendimento() {
    const [fila, setFila] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const carregarFila = async () => {
            setLoading(true);
            setError('');
            try {
                const atendimentosRef = collection(db, 'clientes');
                const q = query(
                    atendimentosRef, 
                    where('status', '==', 'Aguardando'),
                    orderBy('timestamp', 'asc') 
                );
                
                const querySnapshot = await getDocs(q);
                
                const atendimentosDaFila = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setFila(atendimentosDaFila);

            } catch (err) {
                console.error("Erro ao buscar fila do Firebase:", err);
                setError('Não foi possível carregar a fila de atendimento.');
            } finally {
                setLoading(false);
            }
        };

        carregarFila();
    }, []);

    const handleIniciarAtendimento = async (atendimentoId) => {
        try {
            const atendimentoDocRef = doc(db, 'clientes', atendimentoId);

            await updateDoc(atendimentoDocRef, {
                status: 'Em Atendimento' // Atualiza para o novo status
            });

            setFila(prevFila => prevFila.filter(item => item.id !== atendimentoId));
            
            // Navega para uma rota de detalhes/edição. Usaremos 'editar/:id' por enquanto.
            navigate(`/admin/dashboard/editar/${atendimentoId}`);

        } catch (err) {
            console.error("Erro ao iniciar atendimento:", err);
            alert("Não foi possível iniciar o atendimento. Tente novamente.");
        }
    };

    if (loading) return <p>Carregando fila de atendimento...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
                                <strong>Senha: {atendimento.senha || 'N/A'}</strong>
                            </div>
                            <div className="card-body">
                                <p><strong>Veículo:</strong> {atendimento.carro}</p>
                                <p><strong>Serviço:</strong> {atendimento.servico}</p>
                            </div>
                            <div className="card-footer">
                                <button onClick={() => handleIniciarAtendimento(atendimento.id)} className="btn-atender">
                                    Iniciar Atendimento
                                </button>
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