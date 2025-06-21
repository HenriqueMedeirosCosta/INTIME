// client/src/components/admin/pages/DashboardWelcome.js (COPIE E COLE ESTE CÓDIGO)

import React, { useState, useEffect } from 'react';
import './DashboardWelcome.css';
import { db } from '../../../firebase'; 
import { collection, query, where, getCountFromServer } from 'firebase/firestore';

function DashboardWelcome() {
    const nomeGerente = "Gerente"; 
    const [stats, setStats] = useState({ aguardando: 0, emExecucao: 0 });
    const [loading, setLoading] = useState(true);

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    useEffect(() => {
        const carregarEstatisticas = async () => {
            setLoading(true);

            try {
                const atendimentosRef = collection(db, 'clientes');

                const qAguardando = query(atendimentosRef, where('status', '==', 'Aguardando atendimento'));
                const qEmExecucao = query(atendimentosRef, where('status', '==', 'Em Execução'));

                const [snapshotAguardando, snapshotEmExecucao] = await Promise.all([
                    getCountFromServer(qAguardando),
                    getCountFromServer(qEmExecucao)
                ]);

                setStats({
                    aguardando: snapshotAguardando.data().count,
                    emExecucao: snapshotEmExecucao.data().count,
                });

            } catch (error) {
                console.error("Erro ao buscar estatísticas do Firebase:", error);
                setStats({ aguardando: '!', emExecucao: '!' });
            } finally {
                setLoading(false);
            }
        };

        carregarEstatisticas();
    }, []);

    return (
        <div className="dashboard-welcome">
            <header className="welcome-header">
                <h2>Olá, {nomeGerente}!</h2>
                <p>Hoje é {dataAtual}. Aqui está o resumo da sua oficina.</p>
            </header>

            <section className="stats-container">
                <div className="stat-card">
                    <h3>{loading ? '...' : stats.aguardando}</h3>
                    <p>Veículos na Fila</p>
                </div>
                <div className="stat-card">
                    <h3>{loading ? '...' : stats.emExecucao}</h3>
                    <p>Serviços em Execução</p>
                </div>
            </section>
        </div>
    );
}

export default DashboardWelcome;